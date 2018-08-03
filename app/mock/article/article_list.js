export const ARTICLE_LIST_HEADER = [
  { title: "文章ID", field: "articleId" },
  { title: "文章标题", field: "articleTitle" },
  { title: "文章作者", field: "articleAuthor" },
  { title: "创建日期", field: "articleCreateDate" },
  { title: "修改日期", field: "articleUpdateDate" },
  { title: "文章状态", field: "articleStatus" }
];

export let ARTICLE_LIST = [
  {
    articleId: 1,
    articleTitle: "react从入门到放弃_1",
    articleAuthor: "大孟",
    articleCreateDate: "2018-05-04",
    articleUpdateDate: "2018-05-23",
    articleStatus: "审核中"
  },
  {
    articleId: 2,
    articleTitle: "java从入门到放弃_1",
    articleAuthor: "大孟",
    articleCreateDate: "2018-05-07",
    articleUpdateDate: "2018-06-14",
    articleStatus: "已通过"
  },
  {
    articleId: 3,
    articleTitle: "Go从入门到放弃_1",
    articleAuthor: "大孟",
    articleCreateDate: "2018-6-13",
    articleUpdateDate: "2018-06-20",
    articleStatus: "未发布"
  },
  {
    articleId: 4,
    articleTitle: "react从入门到放弃_2",
    articleAuthor: "大孟",
    articleCreateDate: "2018-05-04",
    articleUpdateDate: "2018-05-23",
    articleStatus: "审核中"
  },
  {
    articleId: 5,
    articleTitle: "java从入门到放弃_2",
    articleAuthor: "大孟",
    articleCreateDate: "2018-05-07",
    articleUpdateDate: "2018-06-14",
    articleStatus: "已通过"
  },
  {
    articleId: 6,
    articleTitle: "Go从入门到放弃_2",
    articleAuthor: "大孟",
    articleCreateDate: "2018-6-13",
    articleUpdateDate: "2018-06-20",
    articleStatus: "未发布"
  },
  {
    articleId: 7,
    articleTitle: "react从入门到放弃_3",
    articleAuthor: "大孟",
    articleCreateDate: "2018-05-04",
    articleUpdateDate: "2018-05-23",
    articleStatus: "审核中"
  },
  {
    articleId: 8,
    articleTitle: "java从入门到放弃_4",
    articleAuthor: "大孟",
    articleCreateDate: "2018-05-07",
    articleUpdateDate: "2018-06-14",
    articleStatus: "已通过"
  },
  {
    articleId: 9,
    articleTitle: "Go从入门到放弃_3",
    articleAuthor: "大孟",
    articleCreateDate: "2018-6-13",
    articleUpdateDate: "2018-06-20",
    articleStatus: "未发布"
  }
];

function getSorting(order, orderBy) {
  //By @oliviertassinari
  return order === "desc" ? (a, b) => b[orderBy] - a[orderBy] : (a, b) => a[orderBy] - b[orderBy];
}

export function MOCK_DB_getArticle(page, limit, order, orderBy) {
  if (page <= 0) {
    page = 1;
  }
  if (page * limit > ARTICLE_LIST.length) {
    return ARTICLE_LIST.sort(getSorting(order, orderBy)).slice((page - 1) * limit, ARTICLE_LIST.length);
  }
  return ARTICLE_LIST.sort(getSorting(order, orderBy)).slice((page - 1) * limit, page * limit);
}

export const test_header = [
  { title: "id", filed: "id" },
  { title: "名称", field: "name" },
  { title: "卡路里", filed: "calories" },
  { title: "脂肪", filed: "fat" },
  { title: "碳水化合物", field: "carbs" },
  { title: "蛋白质", field: "protein" }
];
