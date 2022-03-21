import React, { useState } from "react";
import { Container } from "react-bootstrap";
import { ListItemsPackage } from "../../../components/PackagesList/ListItemsProject";

const PackageList = (props) => {
  let bonus = props.bonus ? parseInt(props.bonus) : 0;

  return (
    <ListItemsPackage
      Requestsbtn={true}
      RequestsModel={props.handleshowRequestsModel}
      title={props.name}
      linkText="Package link"
      link={`/package-details?projectId=${props.projectId}&packageId=${props._id}`}
      tokenName={props.tokenName}
      bonus={bonus}
      totalBudget={
        parseInt(props.minimumCost) * parseInt(props.memberLimit) + bonus
      }
      text={props.description}
      workStatus={props.workStatus}
      requestCount={props.requests.length}
      requestLink={props.requestLink}
      mode={props.mode}
    />
  );
};

export default PackageList;
