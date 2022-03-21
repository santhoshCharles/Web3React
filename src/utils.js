import React from "react";

export const get = (a, b, c) => {
  const retValue = c !== undefined ? c : null;
  return a.reduce(
    (obj, key) =>
      obj && key && obj[key] !== null && obj[key] !== undefined
        ? obj[key]
        : retValue,
    b
  );
};

export const getFileType = (file) => {
  if (file.type.match("image.*")) return "image";

  if (file.type.match("video.*")) return "video";

  if (file.type.match("audio.*")) return "audio";

  if (file.type.match("document.*")) return "document";

  if (file.type.match("pdf.*")) return "pdf";

  if (file.type.match("excel,*")) return "excel";

  // etc...

  return "other";
};

export const parseQueryString = (queryString) => {
  if (!queryString) {
    return false;
  }

  let queries = queryString.split("&"),
    params = {},
    temp;

  for (let i = 0, l = queries.length; i < l; i++) {
    temp = queries[i].split("=");
    if (temp[1] !== "") {
      params[temp[0]] = temp[1];
    }
  }
  return params;
};

export const getMonthYear = (date) => {
  const month = date.toLocaleString('default', { month: 'short' });
  const year = date.getFullYear()
  return `${month} ${year}`;
}

export const getDateMonthYear = (date) => {
  const month = date.toLocaleString('default', { month: 'short' });
  const year = date.getFullYear()
  return `${month} ${date.getDate()}, ${year}`;
}

export const monthDiff = (d1, d2) => {
  let months;
  months = (d2.getFullYear() - d1.getFullYear()) * 12;
  months -= d1.getMonth();
  months += d2.getMonth();
  return months <= 0
    ? `${0} Month`
    : `${months} ${months === 1 ? "Month" : "Months"}`;
};

export const addDaysToTimestamp = (days) => {
  return new Date().setDate(new Date().getDate() + days);
};

export const getUserURL = (state) => {
  return state.environnment.environmentLists.userBaseURL;
};

export const getCommonBaseURL = (state) => {
  return state.environnment.environmentLists.commonBaseURL;
};

export const dayDifferenceTimestamp = (a, b) =>
  Math.floor((a - b) / (1000 * 60 * 60 * 24));

export const renderHTML = (rawHTML: string) =>
  React.createElement("div", { dangerouslySetInnerHTML: { __html: rawHTML } });

export const getMasterData = (type, responseData) => {
  let result = responseData.filter(obj => {
    return obj.type === type
  });
  return result.length > 0 ? result[0].values : [];
}

export const isValidWalletAccount = (selectedAddress, savedAddress) => {
  if (selectedAddress === savedAddress) {
    return true
  } else {
    return false
  }
}