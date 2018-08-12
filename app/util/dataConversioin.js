// 该js用来对后台发送过来的数据进行一定的转换

/**
 * 转换日期
 */
const article_status_0 = '审核中';
const article_status_1 = '已通过';
const article_status_2 = '未通过';

export const convertDate = date => {
  if (date !== null) {
    return date.slice(0, 3).join('-');
  }
  return null;
};

export const convertStatus = status => {
  switch (status) {
    case 0:
      return article_status_0;
    case 1:
      return article_status_1;
    case 2:
      return article_status_2;
    default:
      return article_status_0;
  }
};
