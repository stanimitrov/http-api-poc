export const displayErrorNotification = (text) => {
  $("body").append(
    $("<div>")
      .addClass(
        "alert alert-danger alert-dismissible show z-3 position-fixed bottom-0 w-25"
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
};
