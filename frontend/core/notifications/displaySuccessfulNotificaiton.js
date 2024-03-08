import { removeNotificationAfter3s } from "./removeNotificationAfter3s.js";

export const displaySuccessfulNotification = (text) => {
  $("#alerts-placeholder").append(
    $("<div>")
      .addClass(
        "alert alert-success alert-dismissible show z-3 position-fixed bottom-0 w-25"
      )
      .attr("role", "alert")
      .append($("<span>").text(text))
      .append(
        $("<button>")
          .attr("type", "button")
          .attr("data-bs-dismiss", "alert")
          .attr("aria-label", "Close")
          .addClass("btn-close")
      )
  );

  removeNotificationAfter3s();
};
