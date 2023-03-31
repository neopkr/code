function showNotification(message, type) {
    const notificationsContainer = document.getElementById("notifications-container");
  
    const notification = document.createElement("div");
    notification.textContent = message;
    notification.classList.add("notification", `notification-${type}`, "fade-in");
  
    notificationsContainer.appendChild(notification);
  
    setTimeout(() => {
      notification.classList.replace("fade-in", "fade-out");
      setTimeout(() => {
        notification.remove();
      }, 500);
    }, 5000);
  }