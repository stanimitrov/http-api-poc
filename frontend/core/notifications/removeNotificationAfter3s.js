export const removeNotificationAfter3s = () => {
  setTimeout(() => {
    $("#alerts-placeholder").children(".alert:first-child").remove();
  }, 3000);
};
