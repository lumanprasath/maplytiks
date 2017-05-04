var data = localStorage.getItem("id");
var pages =  getRoleName(data);
function getRoleName(role_id){
var pages=[];
var admin_pages = [
  {
    path: 'pages',
    children: [
      {
        path: 'dashboard',
        data: {
          menu: {
            title: 'Home',
            icon: 'ion-android-home',
            selected: false,
            expanded: false,
            order: 0
          }
        }
      },


      {
        path: 'admin',
        data: {
          menu: {
            title: 'Admin',
            icon: 'ion-android-laptop',
            selected: false,
            expanded: false,
            order: 100
          }
        },
         children: [
            {
            path: 'all-login',
            data: {
              menu: {
                title: 'All User',
              }
            }
          },
           {
            path: 'all-projects',
            data: {
              menu: {
                title: 'All Projects',
              }
            }
          }
         
  
        ]
      },
    
                {
        path: 'newproject',
        data: {
          menu: {
            title: 'New Project',
            icon: 'ion-android-laptop',
            selected: false,
            expanded: false,
            order: 100
          }
        },
         children: [
         
            {
            path: 'formdetails-newproject',
            data: {
              menu: {
                title: 'Details',
              }
            }
          }
  
        ]
      },
     
     
      {
        path: 'charts',
        data: {
          menu: {
            title: 'Dashboard',
            icon: 'ion-stats-bars',
            selected: false,
            expanded: false,
            order: 200,
          }
        },
        children: [
          {
            path: 'chartist-js',
            data: {
              menu: {
                title: 'Maplytiks',
              }
            }
          },
          
          {
            path: 'maplytiks-brandwise',
            data: {
              menu: {
                title: 'Brand Analytics',
              }
            }
          }
        ]
      
      },
      {
        path: '',
        data: {
          menu: {
            title: 'Visit Us',
            url: 'http://drive-analytics.com/',
            icon: 'ion-android-exit',
            order: 800,
            target: '_blank'
          }
        }
      }
    ]
  }
];

var rightHolder_pages = [
  {
    path: 'pages',
    children: [
      {
        path: 'dashboard',
        data: {
          menu: {
            title: 'Home',
            icon: 'ion-android-home',
            selected: false,
            expanded: false,
            order: 0
          }
        }
      },
          {
        path: 'newproject',
        data: {
          menu: {
            title: 'New Project',
            icon: 'ion-android-laptop',
            selected: false,
            expanded: false,
            order: 100
          }
        },
         children: [
         
            {
            path: 'formdetails-newproject',
            data: {
              menu: {
                title: 'Details',
              }
            }
          }
  
        ]
      },
     
     
      {
        path: 'charts',
        data: {
          menu: {
            title: 'Dashboard',
            icon: 'ion-stats-bars',
            selected: false,
            expanded: false,
            order: 200,
          }
        },
        children: [
          {
            path: 'chartist-js',
            data: {
              menu: {
                title: 'Maplytiks',
              }
            }
          },
          
          {
            path: 'maplytiks-brandwise',
            data: {
              menu: {
                title: 'Brand Analytics',
              }
            }
          }
        ]
      
      },
      {
        path: '',
        data: {
          menu: {
            title: 'Visit Us',
            url: 'http://drive-analytics.com/',
            icon: 'ion-android-exit',
            order: 800,
            target: '_blank'
          }
        }
      }
    ]
  }
];

var brandHolder_pages = [
  {
    path: 'pages',
    children: [
      {
        path: 'dashboard',
        data: {
          menu: {
            title: 'Home',
            icon: 'ion-android-home',
            selected: false,
            expanded: false,
            order: 0
          }
        }
      },
          {
        path: 'newproject',
        data: {
          menu: {
            title: 'New Project',
            icon: 'ion-android-laptop',
            selected: false,
            expanded: false,
            order: 100
          }
        },
         children: [
         
            {
            path: 'formdetails-newproject',
            data: {
              menu: {
                title: 'Details',
              }
            }
          }
  
        ]
      },
     
     
      {
        path: 'charts',
        data: {
          menu: {
            title: 'Dashboard',
            icon: 'ion-stats-bars',
            selected: false,
            expanded: false,
            order: 200,
          }
        },
        children: [
          {
            path: 'maplytiks-brandwise',
            data: {
              menu: {
                title: 'Brand Analytics',
              }
            }
          }
        ]
      
      },
      {
        path: '',
        data: {
          menu: {
            title: 'Visit Us',
            url: 'http://drive-analytics.com/',
            icon: 'ion-android-exit',
            order: 800,
            target: '_blank'
          }
        }
      }
    ]
  }
];
var public_pages = [ {
    path: 'pages',
    children: [
      {
        path: '',
        data: {
          menu: {
            title: 'Visit Us',
            url: 'http://drive-analytics.com/',
            icon: 'ion-android-exit',
            order: 800,
            target: '_blank'
          }
        }
      }
    ]
  }];


    var role="";
    if(role_id =='01'){
        role="Admin";
        pages = admin_pages;
    }else if(role_id =='02') {
        role="Right Holders";
        pages = rightHolder_pages;
    }else if(role_id =='03') {
        role="Brand Holders";
        pages = brandHolder_pages;
    }else{
        role ='Public';
        pages =  public_pages;
    }
    return pages;
}

console.log(pages)

export const PAGES_MENU = pages;