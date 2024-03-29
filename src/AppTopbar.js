import React, { useEffect, useRef } from 'react';
import { classNames } from 'primereact/utils';
import { InputText } from 'primereact/inputtext';
import AppMenu from './AppMenu';
import { useNavigate } from 'react-router-dom';

const AppTopbar = (props) => {
    const navigate = useNavigate();
    const searchPanelDesktop = useRef(null);
    const searchPanelMobile = useRef(null);

    useEffect(() => {
        if (props.searchActive) {
            if (window.innerWidth >= 576) searchPanelDesktop.current.focus();
            else searchPanelMobile.current.focus();
        }
    }, [props.searchActive]);

    const onInputKeydown = (event) => {
        const key = event.which;

        //escape, tab and enter
        if (key === 27 || key === 9 || key === 13) {
            if (props.searchActive) props.onTopbarSearchToggle();
        }
    };

    return (
        <div className="layout-topbar">
            <div className="layout-topbar-wrapper">
                <div className="layout-topbar-left">
                    <button tabIndex="0" className="menu-button p-link" onClick={props.onMenuButtonClick}>
                        <i className="pi pi-bars"></i>
                    </button>
                    <button tabIndex="0" id="logo-link" onClick={() => navigate('/')} className="layout-topbar-logo p-link">
                        <img src={`/assets/layout/images/logo-${props.topbarScheme === 'dark' ? 'white' : 'dream'}.svg`} alt="dream-layout" />
                    </button>
                </div>

                <AppMenu
                    menuMode={props.menuMode}
                    sidebarActive={props.sidebarActive}
                    sidebarStatic={props.sidebarStatic}
                    model={props.menu}
                    menuActive={props.menuActive}
                    onRootMenuItemClick={props.onRootMenuItemClick}
                    onMobileMenuActive={props.onMobileMenuActive}
                    onMenuItemClick={props.onMenuItemClick}
                    onSidebarMouseOver={props.onSidebarMouseOver}
                    onSidebarMouseLeave={props.onSidebarMouseLeave}
                    onToggleMenu={props.onToggleMenu}
                    resetActiveIndex={props.resetActiveIndex}
                    onMenuClick={props.onMenuClick}
                />

                <div className="layout-topbar-right">
                    <ul className="layout-topbar-actions">
                        {/* <li className={classNames('topbar-item search-item', { 'active-topmenuitem': props.searchActive })}>
                            <button className="p-link" tabIndex="0" style={{ cursor: 'pointer' }} onClick={props.onTopbarSearchToggle}>
                                <i className="topbar-icon pi pi-search"></i>
                            </button>

                            <div className="search-input-wrapper" onClick={props.onTopbarSearchClick}>
                                <span className="p-input-icon-left">
                                    <i className="pi pi-search"></i>
                                    <InputText ref={searchPanelDesktop} type="text" placeholder="Search..." onKeyDown={onInputKeydown} />
                                </span>
                            </div>

                            <ul className="fadeInDown">
                                <div className="search-input-wrapper p-fluid" style={{ width: '100%' }} onClick={props.onTopbarSearchClick}>
                                    <span className="p-input-icon-left">
                                        <i className="pi pi-search"></i>
                                        <InputText ref={searchPanelMobile} type="text" placeholder="Search..." onKeyDown={onInputKeydown} />
                                    </span>
                                </div>
                            </ul>
                        </li> */}

                        <li className={classNames('topbar-item user-profile', { 'active-topmenuitem fadeInDown': props.topbarUserMenuActive })}>
                            <button className="p-link" style={{ cursor: 'pointer' }} onClick={props.onTopbarUserMenuClick}>
                                <img src="/assets/layout/images/avatar-profilemenu.png" alt="dream-admin-panel" />
                            </button>
                            <ul className="fadeInDown">
                                {/* <li>
                                    <button className="p-link">
                                        <span>Change Password</span>
                                    </button>
                                </li> */}
                                <li onClick={() => navigate('/logout')}>
                                    <button className="p-link">
                                        <span>Logout</span>
                                    </button>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default AppTopbar;
