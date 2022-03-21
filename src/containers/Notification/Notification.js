import React, { useEffect } from "react";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { PageTitle } from "../../components/PageTitle/PageTitle";
import {
  getNotificationListAsync,
  getLinkRedirection,
} from "./redux/notificationApi";
import SplashScreen from "../../components/SplashScreen/SplashScreen";
import { ReactTimeAgoC } from "../../components/utils/ReactTimeAgoC";
import { notificationActions } from "./redux/notificationAction";
import BasicPagination from "../../components/Pagination/BasicPagination";

const Notification = () => {
  const {
    isLoading,
    notificationList,
    notificationSkip,
    notificationLimit,
    refreshNotificationList,
  } = useSelector((state) => state.notification);
  const dispatch = useDispatch();

  useEffect(() => {
    if (refreshNotificationList === true) dispatch(getNotificationListAsync());
  }, [refreshNotificationList]);

  useEffect(() => {
    dispatch(getNotificationListAsync());

    return () => {
      dispatch(notificationActions.resetNotificationBatchNumber(0));
    };
  }, []);

  const onPageChange = (currentBatch) => {
    let count = currentBatch ? currentBatch - 1 : notificationSkip;
    dispatch(notificationActions.setNotificationBatchNumber(count));
  };

  return (
    <>
      {isLoading && <SplashScreen />}
      <PageTitle title="Notification" />
      <div className="pt-80 pb-80 min-height-50vh">
        <Container className="shadowBox bg-white">
          <div className="h2 pb-4">Notification</div>
          <div>
            {notificationList.records &&
              notificationList.records.map((notification) => {
                const link = getLinkRedirection(notification);

                return (
                  <List
                    key={notification._id}
                    link={link}
                    title=""
                    time={
                      notification.createdAt && (
                        <ReactTimeAgoC
                          date={new Date(notification.createdAt)}
                        />
                      )
                    }
                    text={notification.message && notification.message}
                  />
                );
              })}

            {notificationList.recordsTotal > 0 && (
              <div className="row d-flex align-items-center mt-3">
                <div className="col-md-12 aspgntn">
                  <BasicPagination
                    totalRecords={notificationList.recordsTotal}
                    filteredRecords={notificationList.recordsFiltered}
                    limit={notificationLimit}
                    batch={notificationSkip + 1}
                    onBatchChange={onPageChange}
                  />
                </div>
              </div>
            )}
          </div>
        </Container>
      </div>
    </>
  );
};

export default Notification;

export const List = (Props) => {
  return (
    <>
      <div className="re_EarningsList p-4">
        <div className="h5">
          <Link to={Props.link}>{Props.text}</Link>
        </div>
        <div className="p3 color_gray">{Props.time}</div>
      </div>
    </>
  );
};
