// 该js用来对后台发送过来的数据进行一定的转换

/**
 * 转换日期
 */
const status_0 = '审核中';
const status_1 = '已通过';
const status_2 = '未通过';

export const convertDate = date => {
  if (date !== null) {
    return date.slice(0, 3).join('-');
  }
  return null;
};

export const convertStatus = status => {
  switch (status) {
    case 0:
      return status_0;
    case 1:
      return status_1;
    case 2:
      return status_2;
    default:
      return status_0;
  }
};
