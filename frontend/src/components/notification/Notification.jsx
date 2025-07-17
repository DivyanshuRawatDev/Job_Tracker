import React, { useEffect, useState } from "react";
import NotificationIcon from "../../assets/notification.svg";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchClearSingleNotification,
  fetchNotifications,
  fetchRejectNotification,
} from "../../redux/slices/notificationSlice";
import { store } from "../../redux/store";

const Notification = () => {
  const dispatch = useDispatch();
  const { items = [] } = useSelector((store) => store.notifications);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    dispatch(fetchNotifications());
  }, [dispatch]);

  const handleFollowUp = (id) => {
    console.log("Follow up clicked for ID:", id);
    dispatch(fetchClearSingleNotification({ companyID: id }));
  };

  const handleReject = (id) => {
    console.log("Reject clicked for ID:", id);
    dispatch(fetchRejectNotification({ companyID: id }))
      .unwrap()
      .then(() => {
        console.log(
          "Updated companies in state:",
          store.getState().company.companies
        );
      });
  };

  return (
    <>
      <div className="relative">
        <img
          src={NotificationIcon}
          width={35}
          alt="notification"
          style={{ cursor: "pointer" }}
          onClick={() => setShowPopup(true)}
        />
        <p className="absolute top-[-5px] right-0 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
          {items.length > 10 ? "9+" : items.length}
        </p>
      </div>

      {showPopup && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
            overflow: "hidden",
          }}
        >
          <div
            style={{
              width: "500px",
              height: "600px", // 🚨 fixed height for popup
              backgroundColor: "#fff",
              borderRadius: "10px",
              padding: "20px",
              position: "relative",
              boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <button
              style={{
                position: "absolute",
                top: "15px",
                right: "15px",
                background: "transparent",
                border: "none",
                fontSize: "1.5rem",
                cursor: "pointer",
              }}
              onClick={() => setShowPopup(false)}
            >
              &times;
            </button>

            <h2 style={{ marginBottom: "15px" }}>Notifications</h2>

            <div
              style={{
                flex: 1,
                overflowY: "auto",
                paddingRight: "5px",
              }}
            >
              {items.length > 0 ? (
                items.map((notification) => (
                  <div
                    key={notification._id}
                    style={{
                      border: "1px solid #ddd",
                      borderRadius: "8px",
                      padding: "15px",
                      marginBottom: "10px",
                    }}
                  >
                    <h3 style={{ margin: "0 0 5px 0" }}>
                      <strong>Company Name:</strong> {notification.companyName}
                    </h3>
                    <p style={{ margin: "0 0 5px 0" }}>
                      <strong>Designation:</strong> {notification.designation}
                    </p>
                    <p style={{ margin: "0 0 5px 0" }}>
                      <strong>Applied From:</strong> {notification.appliedFrom}
                    </p>
                    <p style={{ margin: "0 0 5px 0" }}>
                      <strong>Contact:</strong> {notification.contact}
                    </p>
                    <p style={{ margin: "0 0 10px 0" }}>
                      <strong>Follow-up Count:</strong>{" "}
                      {notification.followUpCount}
                    </p>
                    <div style={{ display: "flex", gap: "10px" }}>
                      <button
                        onClick={() => handleFollowUp(notification._id)}
                        style={{
                          flex: 1,
                          backgroundColor: "#4CAF50",
                          color: "#fff",
                          border: "none",
                          borderRadius: "5px",
                          padding: "8px 12px",
                          cursor: "pointer",
                        }}
                      >
                        Follow Up
                      </button>
                      <button
                        onClick={() => handleReject(notification._id)}
                        style={{
                          flex: 1,
                          backgroundColor: "#f44336",
                          color: "#fff",
                          border: "none",
                          borderRadius: "5px",
                          padding: "8px 12px",
                          cursor: "pointer",
                        }}
                        
                      >
                        Reject
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <p>No notifications found.</p>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Notification;
