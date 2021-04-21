let lessons = [
    {title: '媒体查询响应式布局',category: 'css'},
    {title: 'FLEX 弹性盒模型',category: 'css'},
    {title: 'MYSQL多表查询随意操作',category: 'mysql'}
  ];
  
  let cssLessons = lessons.filter(function (item, index, array) {
    if (item.category.toLowerCase() == 'css') {
      return true;
    }
  });
  
  console.log(cssLessons);