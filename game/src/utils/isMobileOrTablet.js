/** @format */

export const isTabletOrMobile = () => {
 const userAgent = navigator.userAgent;

 const mobileKeywords = ["Mobi", "Android", "iPhone", "iPad", "Windows Phone"];

 const tabletKeywords = ["Tablet", "iPad"];

 const isMobile = mobileKeywords.some((keyword) => userAgent.includes(keyword));
 const isTablet = tabletKeywords.some((keyword) => userAgent.includes(keyword));

 return isMobile || isTablet;
};
