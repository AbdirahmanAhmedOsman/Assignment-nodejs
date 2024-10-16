const calculateTotalTarget = (startDate, endDate, totalAnnualTarget) => {

    const isFriday = (date) => {
        return new Date(date).getDay() === 5; 
    };

  
    const getWorkingDaysInMonth = (year, month) => {
        let date = new Date(year, month, 1);
        let workingDays = 0;
        while (date.getMonth() === month) {
            if (!isFriday(date)) {
                workingDays++;
            }
            date.setDate(date.getDate() + 1);
        }
        return workingDays;
    };

   
    const getWorkingDaysInRange = (startDate, endDate) => {
        let start = new Date(startDate);
        let end = new Date(endDate);
        let workingDays = 0;
        while (start <= end) {
            if (!isFriday(start)) {
                workingDays++;
            }
            start.setDate(start.getDate() + 1);
        }
        return workingDays;
    };

    const start = new Date(startDate);
    const end = new Date(endDate);

   
    const daysExcludingFridays = [];
    const daysWorkedExcludingFridays = [];
    const monthlyTargets = [];

    let totalTarget = 0;
    let currentMonth = start.getMonth();
    let currentYear = start.getFullYear();

   
    while (currentYear < end.getFullYear() || (currentYear === end.getFullYear() && currentMonth <= end.getMonth())) {
     
        const totalWorkingDays = getWorkingDaysInMonth(currentYear, currentMonth);
        daysExcludingFridays.push(totalWorkingDays);

      
        let startOfMonth = new Date(currentYear, currentMonth );
        let endOfMonth = new Date(currentYear, currentMonth + 1, 0);
        

        let startInRange = start > startOfMonth ? start : startOfMonth;
        let endInRange = end < endOfMonth ? end : endOfMonth;

        const workedDays = getWorkingDaysInRange(startInRange, endInRange);
        daysWorkedExcludingFridays.push(workedDays);

        const monthlyTarget = (workedDays / totalWorkingDays) * (totalAnnualTarget / 12);
        monthlyTargets.push(monthlyTarget);

        totalTarget += monthlyTarget;

    
        currentMonth++;
        if (currentMonth === 12) {
            currentMonth = 0;
            currentYear++;
        }
    }

    console.log("________________________________________\n")

    console.log('daysExcludingFridays:', daysExcludingFridays);
    console.log('daysWorkedExcludingFridays:', daysWorkedExcludingFridays);
    console.log('monthlyTargets:', monthlyTargets);
    console.log('totalTarget:', totalTarget);

    console.log("\n________________________________________")
};


calculateTotalTarget('2024-01-01', '2024-05-31', 5220);


