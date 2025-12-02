export const GoalTimeUtil = (updatedAt) => {
  const currentDate = Date.now();

  // use updatedAt , since it is created once a new goal is created
  const updatedAtDate = new Date(updatedAt).getTime();
  const lastUpdate = new Date(updatedAt).getTime();

  const timeDifference = currentDate - updatedAtDate;
  const oneWeek = 1000 * 60 * 60 * 24 * 7;
  const oneMinute = 1000 * 60;
  const getWeeksSinceLastUpdate = Math.floor(timeDifference / oneWeek);
  const getMinutesSinceLastCreated = Math.floor(timeDifference / oneMinute);

  return { getWeeksSinceLastUpdate, getMinutesSinceLastCreated };

  // const getMonthSinceInitialCreation =
  // const getMonthOFLastUpdate =
};
