// @ts-nocheck
import React, { useState, useEffect, useRef } from 'react';
import { classNames } from 'primereact/utils';
import { useLocation } from 'react-router-dom';

import AppTopbar from './AppTopbar';
import AppFooter from './AppFooter';
import AppConfig from './AppConfig';

import PrimeReact from 'primereact/api';
import { Tooltip } from 'primereact/tooltip';

import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import './App.scss';
import { MenuItem } from './config/menu.config';
import { MainRoute } from './config/MainRoute';

import ToastWrapper from './toast.component';
import { UserRole } from './common/common.enum';

import { LoggedInRoleContext } from './components/general/ReactContext';
import { useSelector } from 'react-redux';
import { RootState } from './redux/store';
import { useNavigate } from 'react-router-dom';
import { store } from './redux/store';
import { setNavigate } from './redux/navigate.slice';
import { setUser } from './redux/login_user.slice';
import { getApiData } from './common/DataService';
import { USER_LOGIN_STATUS } from './config/api.config';

const App = (props) => {
    const [resetActiveIndex, setResetActiveIndex] = useState(null);
    const [staticMenuMobileActive, setStaticMenuMobileActive] = useState(false);
    const [sidebarStatic, setSidebarStatic] = useState(false);
    const [sidebarActive, setSidebarActive] = useState(false);
    const [menuActive, setMenuActive] = useState(false);
    const [menuMode, setMenuMode] = useState('sidebar');
    const [configActive, setConfigActive] = useState(false);
    const [inputStyle, setInputStyle] = useState('filled');
    const [ripple, setRipple] = useState(false);
    const [colorScheme, setColorScheme] = useState('light');
    const [topbarScheme, setTopbarScheme] = useState('light');
    const [menuScheme, setMenuScheme] = useState('light');
    const [themeScheme, setThemeScheme] = useState('light');
    const [theme, setTheme] = useState('purple');
    const [searchActive, setSearchActive] = useState(false);
    const [topbarUserMenuActive, setTopbarUserMenuActive] = useState(false);
    const copyTooltipRef = useRef();
    const location = useLocation();

    //Login User Role - Redux to Context
    const [role, setRole] = useState(UserRole.GUEST);
    const storeLoginUser = useSelector((state: RootState) => state.loginUser.user);
    useEffect(() => {
        if (!storeLoginUser || !storeLoginUser.id) {
            //call login status api
            (async () => {
                let result = await getApiData<LoginStatusResponseDto>(USER_LOGIN_STATUS);
                if (result.data.success) {
                    store.dispatch(setUser(result.data.data.user));
                } else {
                    store.dispatch(setNavigate({ to: '/logout', from: '' }));
                    return;
                }
            })();
        } else {
            setRole(storeLoginUser.userType);
        }
    }, [storeLoginUser]);

    //Navigate from redux state
    const navigate = useNavigate();
    const reduxNavigate = useSelector((state: RootState) => state.navigation);
    useEffect(() => {
        if (reduxNavigate && reduxNavigate.to) {
            store.dispatch(setNavigate({ to: '', from: '' }));
            navigate(reduxNavigate.to);
        }
    }, [navigate, reduxNavigate]);

    // Filering menu based on user role
    const [menu, setMenu] = useState([]);
    useEffect(() => {
        // Deep cloning array
        const menuData = JSON.parse(JSON.stringify(MenuItem));
        setMenu(
            menuData
                .map((item) => {
                    if (item.items) {
                        item.items = item.items.filter((childItem) => {
                            if (childItem.role) {
                                return childItem.role.includes(role);
                            }
                            return false;
                        });
                    }
                    return item;
                })
                .filter((item) => {
                    if (item.role) {
                        return item.role.includes(role);
                    }
                    return false;
                })
        );
    }, [role]);

    let menuClick;
    let configClick;
    let searchClick;
    let topbarUserMenuClick;

    useEffect(() => {
        copyTooltipRef && copyTooltipRef.current && copyTooltipRef.current.updateTargetEvents();
    }, [location]);

    useEffect(() => {
        if (staticMenuMobileActive) {
            blockBodyScroll();
        } else {
            unblockBodyScroll();
        }
    }, [staticMenuMobileActive]);

    useEffect(() => {
        setResetActiveIndex(true);
        setMenuActive(false);
    }, [menuMode]);

    const onMenuItemClick = (event) => {
        if (!event.item.items) {
            setResetActiveIndex(true);
            hideOverlayMenu();
        }
        if (!event.item.items && (isSlim() || isHorizontal())) {
            setMenuActive(false);
        }
    };

    const onMenuClick = (event) => {
        if (menuActive && event.target.className === 'layout-menu-container') {
            setResetActiveIndex(true);
            setMenuActive(false);
        }
        menuClick = true;
    };

    const onMenuModeChange = (menuMode) => {
        setMenuMode(menuMode);
        if (menuMode === 'sidebar') {
            if (sidebarStatic) {
                setSidebarActive(true);
            }
        } else {
            setSidebarActive(false);
            if (topbarScheme !== menuScheme) {
                setMenuScheme(topbarScheme);
            }
        }
        if (topbarScheme === 'dark') {
            setThemeScheme('dark');
        }
    };

    const onColorSchemeChange = (scheme) => {
        setColorScheme(scheme);
        props.setColorScheme(scheme);
    };

    const onThemeSchemeChange = (scheme) => {
        setThemeScheme(scheme);
        setMenuScheme(scheme);
        setTopbarScheme(scheme);
    };

    const onTopbarSchemeChange = (scheme) => {
        setTopbarScheme(scheme);
    };

    const onMenuSchemeChange = (scheme) => {
        setMenuScheme(scheme);
    };

    const onThemeChange = (themeColor) => {
        setTheme(themeColor);
    };

    const blockBodyScroll = () => {
        if (document.body.classList) {
            document.body.classList.add('blocked-scroll');
        } else {
            document.body.className += ' blocked-scroll';
        }
    };

    const unblockBodyScroll = () => {
        if (document.body.classList) {
            document.body.classList.remove('blocked-scroll');
        } else {
            document.body.className = document.body.className.replace(new RegExp('(^|\\b)' + 'blocked-scroll'.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
        }
    };

    const onMenuButtonClick = (event) => {
        menuClick = true;
        setTopbarUserMenuActive(false);

        if (isMobile()) {
            setStaticMenuMobileActive((prevStaticMenuMobileActive) => !prevStaticMenuMobileActive);
            if (staticMenuMobileActive) {
                blockBodyScroll();
            } else {
                unblockBodyScroll();
            }
        }
        event.preventDefault();
    };

    const isMobile = () => {
        return window.innerWidth <= 991;
    };

    const isHorizontal = () => {
        return menuMode === 'horizontal';
    };

    const isSlim = () => {
        return menuMode === 'slim';
    };

    const hideOverlayMenu = () => {
        setStaticMenuMobileActive(false);
        unblockBodyScroll();
    };

    const onConfigClick = () => {
        configClick = true;
    };

    const onConfigButtonClick = () => {
        setConfigActive((prevConfigActive) => !prevConfigActive);
        configClick = true;
    };

    const onTopbarSearchToggle = () => {
        setSearchActive((prevState) => !prevState);
        searchClick = true;
    };

    const onTopbarSearchClick = () => {
        searchClick = true;
    };

    const onTopbarUserMenuClick = () => {
        setTopbarUserMenuActive((prevState) => !prevState);
        topbarUserMenuClick = true;
    };

    const onInputStyleChange = (inputStyle) => {
        setInputStyle(inputStyle);
    };

    const onRippleChange = (e) => {
        PrimeReact.ripple = e.value;
        setRipple(e.value);
    };

    const onDocumentClick = () => {
        if (!searchClick && searchActive) {
            setSearchActive(false);
            searchClick = false;
        }

        if (!topbarUserMenuClick && topbarUserMenuActive) {
            setTopbarUserMenuActive(false);
            topbarUserMenuClick = false;
        }

        if (!configClick && configActive) {
            setConfigActive(false);
        }

        if (!menuClick) {
            if (isSlim() || isHorizontal()) {
                setResetActiveIndex(true);
                setMenuActive(false);
            }

            if (staticMenuMobileActive) {
                hideOverlayMenu();
            }

            unblockBodyScroll();
        }

        searchClick = false;
        topbarUserMenuClick = false;
        configClick = false;
        menuClick = false;
    };

    const onSidebarMouseOver = () => {
        setSidebarActive(!isMobile());
    };

    const onSidebarMouseLeave = () => {
        setSidebarActive(false);
    };

    const onToggleMenu = (event) => {
        menuClick = true;
        setSidebarStatic((prevState) => !prevState);

        event.preventDefault();
    };

    const onRootMenuItemClick = () => {
        setMenuActive((prevMenuActive) => !prevMenuActive);
    };

    const layoutClassName = classNames(
        'layout-wrapper',
        {
            'layout-sidebar': menuMode === 'sidebar',
            'layout-static': menuMode === 'sidebar' && sidebarStatic,
            'layout-horizontal': menuMode === 'horizontal',
            'layout-slim': menuMode === 'slim',
            'layout-mobile-active': staticMenuMobileActive,
            'p-input-filled': inputStyle === 'filled',
            'p-ripple-disabled': !ripple
        },
        'layout-menu-' + menuScheme + ' layout-topbar-' + topbarScheme
    );

    return (
        <LoggedInRoleContext.Provider value={{ role, setRole }}>
            <div className={layoutClassName} onClick={onDocumentClick}>
                <Tooltip ref={copyTooltipRef} target=".block-action-copy" position="bottom" content="Copied to clipboard" event="focus" />

                <AppTopbar
                    topbarScheme={topbarScheme}
                    searchActive={searchActive}
                    onTopbarSearchToggle={onTopbarSearchToggle}
                    onTopbarSearchClick={onTopbarSearchClick}
                    topbarUserMenuActive={topbarUserMenuActive}
                    onTopbarUserMenuClick={onTopbarUserMenuClick}
                    menu={menu}
                    menuActive={menuActive}
                    onRootMenuItemClick={onRootMenuItemClick}
                    mobileMenuActive={staticMenuMobileActive}
                    onMenuItemClick={onMenuItemClick}
                    menuMode={menuMode}
                    sidebarStatic={sidebarStatic}
                    sidebarActive={sidebarActive}
                    onSidebarMouseOver={onSidebarMouseOver}
                    onSidebarMouseLeave={onSidebarMouseLeave}
                    onToggleMenu={onToggleMenu}
                    onMenuButtonClick={onMenuButtonClick}
                    resetActiveIndex={resetActiveIndex}
                    onMenuClick={onMenuClick}
                />

                <AppConfig
                    configActive={configActive}
                    onConfigButtonClick={onConfigButtonClick}
                    onConfigClick={onConfigClick}
                    menuMode={menuMode}
                    onMenuModeChange={onMenuModeChange}
                    ripple={ripple}
                    onRippleChange={onRippleChange}
                    inputStyle={inputStyle}
                    onInputStyleChange={onInputStyleChange}
                    colorScheme={colorScheme}
                    onColorSchemeChange={onColorSchemeChange}
                    topbarScheme={topbarScheme}
                    onTopbarSchemeChange={onTopbarSchemeChange}
                    menuScheme={menuScheme}
                    onMenuSchemeChange={onMenuSchemeChange}
                    themeScheme={themeScheme}
                    onThemeSchemeChange={onThemeSchemeChange}
                    theme={theme}
                    onThemeChange={onThemeChange}
                />

                {(role === UserRole.MANUFACTURER || role === UserRole.ADMIN) && (
                    <div className="layout-main">
                        <div className="layout-content">
                            <ToastWrapper />
                            <MainRoute />
                        </div>

                        <AppFooter />
                    </div>
                )}

                <div className="layout-mask modal-in"></div>
            </div>
        </LoggedInRoleContext.Provider>
    );
};

export default App;
