export default {
  params: [
    {
      label: 'limit',
      value: ''
    },
    {
      label: 'userType',
      storage: 'userInfo',
      value: 'userType'
    },
    {
      label: 'limit',
      static: true,
      value: 10
    },
    {
      label: 'page',
      static: true,
      value: 1
    }
  ],
  load: fireControlKnowledgeDataPage
};
