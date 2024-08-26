var BaseUrl = window.location.origin;

//CE ORG CHART
var initTooltip = function() {
    jQuery(document).find('.ce-org-member[data-html="true"]').each(function() {
        $(this).tooltip({
            html: true,
            title: $($(this).attr('data-original-title')).html()
        });
    });
}

var deptData = {
    'title': 'Công ty cổ phần thương mại',
    'logo': BaseUrl + '/Assets/app/media/logos/logo.png',
    'members': [{
            'name': 'Lò Văn Đông',
            'url': 'https://lione.cybereye.vn/donglv',
            'avatar': BaseUrl + '/Assets/app/media/users/100_1.jpg',
            'position': 'Lập trình viên Frontend',
            'title': 'Trưởng phòng'
        },
        {
            'name': 'Lê Minh Hiệp',
            'url': 'https://lione.cybereye.vn/hieplm',
            'avatar': BaseUrl + '/Assets/app/media/users/100_2.jpg',
            'position': 'Lập trình viên Frontend',
            'title': 'Trưởng phòng'
        },
        {
            'name': 'Nguyễn Đức Quang',
            'url': 'https://lione.cybereye.vn/quangnd',
            'avatar': BaseUrl + '/Assets/app/media/users/100_3.jpg',
            'position': 'Lập trình viên Frontend',
            'title': 'Trưởng phòng'
        }
    ],
    'children': [{
        'title': 'Công ty cổ phần thương mại',
        'logo': BaseUrl + '/Assets/app/media/logos/logo.png',
        'members': [{
                'name': 'Lò Văn Đông',
                'url': 'https://lione.cybereye.vn/donglv',
                'avatar': BaseUrl + '/Assets/app/media/users/100_1.jpg',
                'position': 'Lập trình viên Frontend',
                'title': 'Trưởng phòng'
            },
            {
                'name': 'Lê Minh Hiệp',
                'url': 'https://lione.cybereye.vn/hieplm',
                'avatar': BaseUrl + '/Assets/app/media/users/100_2.jpg',
                'position': 'Lập trình viên Frontend',
                'title': 'Trưởng phòng'
            },
            {
                'name': 'Nguyễn Đức Quang',
                'url': 'https://lione.cybereye.vn/quangnd',
                'avatar': BaseUrl + '/Assets/app/media/users/100_3.jpg',
                'position': 'Lập trình viên Frontend',
                'title': 'Trưởng phòng'
            }
        ],
        'children': [{
            'title': 'P.PTPM',
            'logo': '',
            'members': [{
                    'name': 'Lò Văn Đông',
                    'url': 'https://lione.cybereye.vn/donglv',
                    'avatar': BaseUrl + '/Assets/app/media/users/100_1.jpg',
                    'position': 'Lập trình viên Frontend',
                    'title': 'Trưởng phòng'
                },
                {
                    'name': 'Lê Minh Hiệp',
                    'url': 'https://lione.cybereye.vn/hieplm',
                    'avatar': BaseUrl + '/Assets/app/media/users/100_2.jpg',
                    'position': 'Lập trình viên Frontend',
                    'title': 'Trưởng phòng'
                },
                {
                    'name': 'Nguyễn Đức Quang',
                    'url': 'https://lione.cybereye.vn/quangnd',
                    'avatar': BaseUrl + '/Assets/app/media/users/100_3.jpg',
                    'position': 'Lập trình viên Frontend',
                    'title': 'Trưởng phòng'
                }
            ],
            'children': [{
                'title': 'Team Dev',
                'logo': '',
                'members': [{
                        'name': 'Lò Văn Đông',
                        'url': 'https://lione.cybereye.vn/donglv',
                        'avatar': BaseUrl + '/Assets/app/media/users/100_1.jpg',
                        'position': 'Lập trình viên Frontend',
                        'title': 'Trưởng phòng'
                    },
                    {
                        'name': 'Lê Minh Hiệp',
                        'url': 'https://lione.cybereye.vn/hieplm',
                        'avatar': BaseUrl + '/Assets/app/media/users/100_2.jpg',
                        'position': 'Lập trình viên Frontend',
                        'title': 'Trưởng phòng'
                    }
                ]
            }, {
                'title': 'Team BA',
                'logo': '',
                'members': [{
                        'name': 'Lò Văn Đông',
                        'url': 'https://lione.cybereye.vn/donglv',
                        'avatar': BaseUrl + '/Assets/app/media/users/100_1.jpg',
                        'position': 'Lập trình viên Frontend',
                        'title': 'Trưởng phòng'
                    },
                    {
                        'name': 'Lê Minh Hiệp',
                        'url': 'https://lione.cybereye.vn/hieplm',
                        'avatar': BaseUrl + '/Assets/app/media/users/100_2.jpg',
                        'position': 'Lập trình viên Frontend',
                        'title': 'Trưởng phòng'
                    }
                ]
            }]
        }, {
            'title': 'P.Số hóa',
            'logo': '',
            'members': [{
                    'name': 'Lò Văn Đông',
                    'url': 'https://lione.cybereye.vn/donglv',
                    'avatar': BaseUrl + '/Assets/app/media/users/100_1.jpg',
                    'position': 'Lập trình viên Frontend',
                    'title': 'Trưởng phòng'
                },
                {
                    'name': 'Lê Minh Hiệp',
                    'url': 'https://lione.cybereye.vn/hieplm',
                    'avatar': BaseUrl + '/Assets/app/media/users/100_2.jpg',
                    'position': 'Lập trình viên Frontend',
                    'title': 'Trưởng phòng'
                },
                {
                    'name': 'Nguyễn Đức Quang',
                    'url': 'https://lione.cybereye.vn/quangnd',
                    'avatar': BaseUrl + '/Assets/app/media/users/100_3.jpg',
                    'position': 'Lập trình viên Frontend',
                    'title': 'Trưởng phòng'
                }
            ]
        }, {
            'title': 'P.HCNS',
            'logo': '',
            'members': [{
                    'name': 'Lò Văn Đông',
                    'url': 'https://lione.cybereye.vn/donglv',
                    'avatar': BaseUrl + '/Assets/app/media/users/100_1.jpg',
                    'position': 'Lập trình viên Frontend',
                    'title': 'Trưởng phòng'
                },
                {
                    'name': 'Lê Minh Hiệp',
                    'url': 'https://lione.cybereye.vn/hieplm',
                    'avatar': BaseUrl + '/Assets/app/media/users/100_2.jpg',
                    'position': 'Lập trình viên Frontend',
                    'title': 'Trưởng phòng'
                },
                {
                    'name': 'Nguyễn Đức Quang',
                    'url': 'https://lione.cybereye.vn/quangnd',
                    'avatar': BaseUrl + '/Assets/app/media/users/100_3.jpg',
                    'position': 'Lập trình viên Frontend',
                    'title': 'Trưởng phòng'
                }
            ]
        }]
    }, {
        'title': 'Công ty cổ phần thương mại',
        'logo': BaseUrl + '/Assets/app/media/logos/logo.png',
        'members': [{
                'name': 'Lò Văn Đông',
                'url': 'https://lione.cybereye.vn/donglv',
                'avatar': BaseUrl + '/Assets/app/media/users/100_1.jpg',
                'position': 'Lập trình viên Frontend',
                'title': 'Trưởng phòng'
            },
            {
                'name': 'Lê Minh Hiệp',
                'url': 'https://lione.cybereye.vn/hieplm',
                'avatar': BaseUrl + '/Assets/app/media/users/100_2.jpg',
                'position': 'Lập trình viên Frontend',
                'title': 'Trưởng phòng'
            },
            {
                'name': 'Nguyễn Đức Quang',
                'url': 'https://lione.cybereye.vn/quangnd',
                'avatar': BaseUrl + '/Assets/app/media/users/100_3.jpg',
                'position': 'Lập trình viên Frontend',
                'title': 'Trưởng phòng'
            }, {
                'name': 'Lò Văn Đông',
                'url': 'https://lione.cybereye.vn/donglv',
                'avatar': BaseUrl + '/Assets/app/media/users/100_1.jpg',
                'position': 'Lập trình viên Frontend',
                'title': 'Trưởng phòng'
            },
            {
                'name': 'Lê Minh Hiệp',
                'url': 'https://lione.cybereye.vn/hieplm',
                'avatar': BaseUrl + '/Assets/app/media/users/100_2.jpg',
                'position': 'Lập trình viên Frontend',
                'title': 'Trưởng phòng'
            },
            {
                'name': 'Nguyễn Đức Quang',
                'url': 'https://lione.cybereye.vn/quangnd',
                'avatar': BaseUrl + '/Assets/app/media/users/100_3.jpg',
                'position': 'Lập trình viên Frontend',
                'title': 'Trưởng phòng'
            }, {
                'name': 'Lò Văn Đông',
                'url': 'https://lione.cybereye.vn/donglv',
                'avatar': BaseUrl + '/Assets/app/media/users/100_1.jpg',
                'position': 'Lập trình viên Frontend',
                'title': 'Trưởng phòng'
            },
            {
                'name': 'Lê Minh Hiệp',
                'url': 'https://lione.cybereye.vn/hieplm',
                'avatar': BaseUrl + '/Assets/app/media/users/100_2.jpg',
                'position': 'Lập trình viên Frontend',
                'title': 'Trưởng phòng'
            },
            {
                'name': 'Nguyễn Đức Quang',
                'url': 'https://lione.cybereye.vn/quangnd',
                'avatar': BaseUrl + '/Assets/app/media/users/100_3.jpg',
                'position': 'Lập trình viên Frontend',
                'title': 'Trưởng phòng'
            }
        ],
        'children': [{
            'title': 'P.Kinh doanh',
            'logo': '',
            'members': [{
                    'name': 'Lò Văn Đông',
                    'url': 'https://lione.cybereye.vn/donglv',
                    'avatar': BaseUrl + '/Assets/app/media/users/100_1.jpg',
                    'position': 'Lập trình viên Frontend',
                    'title': 'Trưởng phòng'
                },
                {
                    'name': 'Lê Minh Hiệp',
                    'url': 'https://lione.cybereye.vn/hieplm',
                    'avatar': BaseUrl + '/Assets/app/media/users/100_2.jpg',
                    'position': 'Lập trình viên Frontend',
                    'title': 'Trưởng phòng'
                },
                {
                    'name': 'Nguyễn Đức Quang',
                    'url': 'https://lione.cybereye.vn/quangnd',
                    'avatar': BaseUrl + '/Assets/app/media/users/100_3.jpg',
                    'position': 'Lập trình viên Frontend',
                    'title': 'Trưởng phòng'
                }
            ]
        }, {
            'title': 'P.TCKT',
            'logo': '',
            'members': [{
                    'name': 'Lò Văn Đông',
                    'url': 'https://lione.cybereye.vn/donglv',
                    'avatar': BaseUrl + '/Assets/app/media/users/100_1.jpg',
                    'position': 'Lập trình viên Frontend',
                    'title': 'Trưởng phòng'
                },
                {
                    'name': 'Lê Minh Hiệp',
                    'url': 'https://lione.cybereye.vn/hieplm',
                    'avatar': BaseUrl + '/Assets/app/media/users/100_2.jpg',
                    'position': 'Lập trình viên Frontend',
                    'title': 'Trưởng phòng'
                },
                {
                    'name': 'Nguyễn Đức Quang',
                    'url': 'https://lione.cybereye.vn/quangnd',
                    'avatar': BaseUrl + '/Assets/app/media/users/100_3.jpg',
                    'position': 'Lập trình viên Frontend',
                    'title': 'Trưởng phòng'
                }, {
                    'name': 'Lò Văn Đông',
                    'url': 'https://lione.cybereye.vn/donglv',
                    'avatar': BaseUrl + '/Assets/app/media/users/100_1.jpg',
                    'position': 'Lập trình viên Frontend',
                    'title': 'Trưởng phòng'
                },
                {
                    'name': 'Lê Minh Hiệp',
                    'url': 'https://lione.cybereye.vn/hieplm',
                    'avatar': BaseUrl + '/Assets/app/media/users/100_2.jpg',
                    'position': 'Lập trình viên Frontend',
                    'title': 'Trưởng phòng'
                },
                {
                    'name': 'Nguyễn Đức Quang',
                    'url': 'https://lione.cybereye.vn/quangnd',
                    'avatar': BaseUrl + '/Assets/app/media/users/100_3.jpg',
                    'position': 'Lập trình viên Frontend',
                    'title': 'Trưởng phòng'
                }
            ]
        }, {
            'title': 'P.HCNS',
            'logo': '',
            'members': [{
                    'name': 'Lò Văn Đông',
                    'url': 'https://lione.cybereye.vn/donglv',
                    'avatar': BaseUrl + '/Assets/app/media/users/100_1.jpg',
                    'position': 'Lập trình viên Frontend',
                    'title': 'Trưởng phòng'
                },
                {
                    'name': 'Lê Minh Hiệp',
                    'url': 'https://lione.cybereye.vn/hieplm',
                    'avatar': BaseUrl + '/Assets/app/media/users/100_2.jpg',
                    'position': 'Lập trình viên Frontend',
                    'title': 'Trưởng phòng'
                },
                {
                    'name': 'Nguyễn Đức Quang',
                    'url': 'https://lione.cybereye.vn/quangnd',
                    'avatar': BaseUrl + '/Assets/app/media/users/100_3.jpg',
                    'position': 'Lập trình viên Frontend',
                    'title': 'Trưởng phòng'
                }
            ]
        }]
    }, {
        'title': 'Công ty cổ phần thương mại',
        'logo': BaseUrl + '/Assets/app/media/logos/logo.png',
        'members': [{
                'name': 'Lò Văn Đông',
                'url': 'https://lione.cybereye.vn/donglv',
                'avatar': BaseUrl + '/Assets/app/media/users/100_1.jpg',
                'position': 'Lập trình viên Frontend',
                'title': 'Trưởng phòng'
            },
            {
                'name': 'Lê Minh Hiệp',
                'url': 'https://lione.cybereye.vn/hieplm',
                'avatar': BaseUrl + '/Assets/app/media/users/100_2.jpg',
                'position': 'Lập trình viên Frontend',
                'title': 'Trưởng phòng'
            },
            {
                'name': 'Nguyễn Đức Quang',
                'url': 'https://lione.cybereye.vn/quangnd',
                'avatar': BaseUrl + '/Assets/app/media/users/100_3.jpg',
                'position': 'Lập trình viên Frontend',
                'title': 'Trưởng phòng'
            }
        ],
        'children': [{
            'title': 'P.HSPC',
            'logo': '',
            'members': [{
                    'name': 'Lò Văn Đông',
                    'url': 'https://lione.cybereye.vn/donglv',
                    'avatar': BaseUrl + '/Assets/app/media/users/100_1.jpg',
                    'position': 'Lập trình viên Frontend',
                    'title': 'Trưởng phòng'
                },
                {
                    'name': 'Lê Minh Hiệp',
                    'url': 'https://lione.cybereye.vn/hieplm',
                    'avatar': BaseUrl + '/Assets/app/media/users/100_2.jpg',
                    'position': 'Lập trình viên Frontend',
                    'title': 'Trưởng phòng'
                },
                {
                    'name': 'Nguyễn Đức Quang',
                    'url': 'https://lione.cybereye.vn/quangnd',
                    'avatar': BaseUrl + '/Assets/app/media/users/100_3.jpg',
                    'position': 'Lập trình viên Frontend',
                    'title': 'Trưởng phòng'
                }
            ]
        }, {
            'title': 'P.Số hóa',
            'logo': '',
            'members': [{
                    'name': 'Lò Văn Đông',
                    'url': 'https://lione.cybereye.vn/donglv',
                    'avatar': BaseUrl + '/Assets/app/media/users/100_1.jpg',
                    'position': 'Lập trình viên Frontend',
                    'title': 'Trưởng phòng'
                },
                {
                    'name': 'Lê Minh Hiệp',
                    'url': 'https://lione.cybereye.vn/hieplm',
                    'avatar': BaseUrl + '/Assets/app/media/users/100_2.jpg',
                    'position': 'Lập trình viên Frontend',
                    'title': 'Trưởng phòng'
                },
                {
                    'name': 'Nguyễn Đức Quang',
                    'url': 'https://lione.cybereye.vn/quangnd',
                    'avatar': BaseUrl + '/Assets/app/media/users/100_3.jpg',
                    'position': 'Lập trình viên Frontend',
                    'title': 'Trưởng phòng'
                }
            ]
        }, {
            'title': 'P.HCNS',
            'logo': '',
            'members': [{
                    'name': 'Lò Văn Đông',
                    'url': 'https://lione.cybereye.vn/donglv',
                    'avatar': BaseUrl + '/Assets/app/media/users/100_1.jpg',
                    'position': 'Lập trình viên Frontend',
                    'title': 'Trưởng phòng'
                },
                {
                    'name': 'Lê Minh Hiệp',
                    'url': 'https://lione.cybereye.vn/hieplm',
                    'avatar': BaseUrl + '/Assets/app/media/users/100_2.jpg',
                    'position': 'Lập trình viên Frontend',
                    'title': 'Trưởng phòng'
                },
                {
                    'name': 'Nguyễn Đức Quang',
                    'url': 'https://lione.cybereye.vn/quangnd',
                    'avatar': BaseUrl + '/Assets/app/media/users/100_3.jpg',
                    'position': 'Lập trình viên Frontend',
                    'title': 'Trưởng phòng'
                }
            ]
        }]
    }]
};
var deptTemplate = function(data) {
    var get_members = '';
    var dataLength = data.members.length;
    for (var i = 0; i < dataLength; i++) {
        get_members = get_members + `
        <div class="ce-org-members-inner ${i<3?"active":"pending-show"}">
            <a target="_blank" href="${data.members[i].url}" class="ce-org-member" data-toggle="tooltip" data-theme="dark" data-html="true" data-original-title="<div class='ce-member-tooltip'><span class='ce-member-name'>${data.members[i].name}</span><span class='ce-member-position'>${data.members[i].position}</span><span class='ce-member-title'>${data.members[i].title}</span></div>">
                <img src="${data.members[i].avatar}" alt="${data.members[i].name}">
                <div class='ce-member-popup-info'><span class='ce-member-name'>${data.members[i].name}</span><span class='ce-member-position'>${data.members[i].position}</span><span class='ce-member-title'>${data.members[i].title}</span></div>
            </a>
        </div>`;
    }
    if (dataLength > 3) {
        get_members = get_members + `
        <div class="ce-org-members-inner ce-org-members-toggle">
            <a href="javascript:;" class="ce-org-member" title="Xem thêm" data-toggle="modal" data-target="#ModalDeptMembers">
                <span class="ce-org-members-count">+${dataLength-3}</span>
            </a>
        </div>`;
    }
    var getLogo = '';
    if (data.logo) {
        getLogo = `<div class="ce-org-logo">
        <img src="${data.logo}" alt="${data.title}">
        </div>`;
    } else {
        getLogo = '';
    }
    return `
    <div class="ce-org">
        <span class="ce-org-title">${data.title}</span>
        <div class="ce-org-info">
            ${getLogo}
            <div class="ce-org-members">
            ${get_members}  
            </div>         
        </div>
    </div>
    `;
};
var kpiData = {
    'title': 'Công ty cổ phần thương mại FSI',
    'kpi': '82',
    'bgClass': 'bg-primary',
    'children': [{
        'title': 'Công ty cổ phần công nghệ Cyber',
        'kpi': '20',
        'children': [{
            'title': 'P.PTPM',
            'kpi': '40',
            'children': [{
                'title': 'Team Dev',
                'kpi': '55'
            }, {
                'title': 'Team BA',
                'kpi': '95'
            }]
        }, {
            'title': 'P.Số hóa',
            'kpi': '11'
        }, {
            'title': 'P.HCNS',
            'kpi': '35'
        }]
    }, {
        'title': 'Công ty cổ phần thương mại ĐNA',
        'kpi': '27',
        'children': [{
            'title': 'P.Kinh doanh',
            'kpi': '81'
        }, {
            'title': 'P.TCKT',
            'kpi': '99'
        }, {
            'title': 'P.HCNS',
            'kpi': '100'
        }]
    }, {
        'title': 'Công ty cổ phần thương mại HCM',
        'kpi': '11',
        'children': [{
            'title': 'P.HSPC',
            'kpi': '33'
        }, {
            'title': 'P.Số hóa',
            'kpi': '44'
        }, {
            'title': 'P.HCNS',
            'kpi': '55'
        }]
    }]
};
var kpiTemplate = function(data) {
    var bgColor = '';
    var per = data.kpi;
    if (per < 30) {
        bgColor = "#444444"; //Mau den
    } else if (per >= 30 && per < 50) {
        bgColor = "#d43f3a"; //Mau do
    } else if (per >= 50 && per < 80) {
        bgColor = "#ff9800"; //Mau cam
    } else if (per >= 80 && per < 100) {
        bgColor = "#ffeb3b"; //Mau vang
    } else {
        bgColor = "#5cb85c"; //Mau xanh
    }
    return `
    <div class="ce-kpi ${data.bgClass}">
        <span class="ce-kpi-title">${data.title}</span>
        <div class="ce-kpi-process">
            <div class="ce-kpi-process-number">${data.kpi}%</div>         
            <div class="ce-kpi-process-bar">
            <div class="progress progress-xs">
                <div class="progress-bar" role="progressbar" style="width: ${data.kpi}%;background-color: ${bgColor}" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100"></div>
            </div>            
            </div>         
        </div>
    </div>
    `;
};
var ceOrgInit = function(target, data, template) {
    var oc = target.orgchart({
        'data': data,
        'pan': true,
        'zoom': true,
        'nodeTemplate': template
    });
    target.attr('data-bg', 'ce-org');
    oc.$chartContainer.on('touchmove', function(event) {
        event.preventDefault();
    });
    KTApp.initTooltips();
    jQuery(document).on('click', '.switch-org', function(e) {
        e.preventDefault();
        $('.switch-org').toggleClass('btn-primary btn-defautl');
        var orgType = $(this).hasClass('switch-org-dep') == true ? 'dept' : 'kpi';
        if (orgType == 'dept') {
            oc.init({
                'data': deptData,
                'nodeTemplate': deptTemplate
            });
            target.attr('data-bg', 'ce-org');
            KTApp.initTooltips();
        } else {
            oc.init({
                'data': kpiData,
                'nodeTemplate': kpiTemplate
            });
            target.attr('data-bg', 'ce-kpi');
            KTApp.initTooltips();
        }
    });
    jQuery(document).on('click', '.ce-org-members-toggle', function(e) {
        e.preventDefault();
        var title = jQuery(this).parents('.ce-org').children('.ce-org-title').html();
        var membersHtml = jQuery(this).parent().html();
        jQuery('.ce-org-popup-dept').html(title);
        jQuery('.ce-org-popup-members').html(membersHtml);
    });
}

jQuery(document).ready(function() {
    if ($('#chart-container').length != 0) {
        ceOrgInit($('#chart-container'), deptData, deptTemplate);
    }

});