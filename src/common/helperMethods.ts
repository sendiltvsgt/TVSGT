export const getCurrentMonthName = (): string => {
    const currentDate = new Date();

    var currentMonthName = new Intl.DateTimeFormat('en-US', {
        month: 'long'
    }).format(currentDate);

    return currentMonthName.slice(0, 3);
};
