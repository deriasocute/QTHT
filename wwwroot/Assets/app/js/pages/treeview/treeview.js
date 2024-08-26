"use strict";
//$.jstree.defaults.core.themes.variant = "large";

var demoData = [{
        'id': '',
        'text': 'Initially selected',
        'icon': '',
        'state': {
            'opened': false,
            'disabled': false,
            'selected': true
        },
        'li_attr': {},
        'a_attr': {},
        'children': []

    },
    {
        'id': '',
        'text': 'custom icon & Disable',
        'icon': 'fas fa-folder-times',
        'state': {
            'opened': false,
            'disabled': true,
            'selected': false
        },

        'li_attr': {},
        'a_attr': {},
        'children': []

    },
    {
        'id': '',
        'text': 'Initially open',
        'icon': '',
        'state': {
            'opened': true,
            'disabled': false,
            'selected': false
        },
        'li_attr': {},
        'a_attr': {},
        'children': [{
                'id': '',
                'text': 'Children Node',
                'icon': '',
                'state': {
                    'opened': false,
                    'disabled': false,
                    'selected': false
                },
                'li_attr': {},
                'a_attr': {},
                'children': []

            },
            {
                'id': '',
                'text': 'Children Other Node',
                'icon': '',
                'state': {
                    'opened': false,
                    'disabled': false,
                    'selected': false
                },
                'li_attr': {},
                'a_attr': {},
                'children': [{
                        'id': '',
                        'text': 'Initially selected',
                        'icon': '',
                        'state': {
                            'opened': false,
                            'disabled': false,
                            'selected': false
                        },
                        'li_attr': {},
                        'a_attr': {},
                        'children': []

                    },
                    {
                        'id': '',
                        'text': 'custom icon & Disable',
                        'icon': 'fas fa-folder-times',
                        'state': {
                            'opened': false,
                            'disabled': true,
                            'selected': false
                        },

                        'li_attr': {},
                        'a_attr': {},
                        'children': []

                    },
                    {
                        'id': '',
                        'text': 'Initially open',
                        'icon': '',
                        'state': {
                            'opened': true,
                            'disabled': false,
                            'selected': false
                        },
                        'li_attr': {},
                        'a_attr': {},
                        'children': [{
                                'id': '',
                                'text': 'Children Node',
                                'icon': '',
                                'state': {
                                    'opened': false,
                                    'disabled': false,
                                    'selected': false
                                },
                                'li_attr': {},
                                'a_attr': {},
                                'children': []

                            },
                            {
                                'id': '',
                                'text': 'Children Other Node',
                                'icon': '',
                                'state': {
                                    'opened': false,
                                    'disabled': false,
                                    'selected': false
                                },
                                'li_attr': {},
                                'a_attr': {},
                                'children': [{
                                        'id': '',
                                        'text': 'Initially selected',
                                        'icon': '',
                                        'state': {
                                            'opened': false,
                                            'disabled': false,
                                            'selected': false
                                        },
                                        'li_attr': {},
                                        'a_attr': {},
                                        'children': []

                                    },
                                    {
                                        'id': '',
                                        'text': 'custom icon & Disable',
                                        'icon': 'fas fa-folder-times',
                                        'state': {
                                            'opened': false,
                                            'disabled': true,
                                            'selected': false
                                        },

                                        'li_attr': {},
                                        'a_attr': {},
                                        'children': []

                                    },
                                    {
                                        'id': '',
                                        'text': 'Initially open',
                                        'icon': '',
                                        'state': {
                                            'opened': true,
                                            'disabled': false,
                                            'selected': false
                                        },
                                        'li_attr': {},
                                        'a_attr': {},
                                        'children': [{
                                                'id': '',
                                                'text': 'Children Node',
                                                'icon': '',
                                                'state': {
                                                    'opened': false,
                                                    'disabled': false,
                                                    'selected': false
                                                },
                                                'li_attr': {},
                                                'a_attr': {},
                                                'children': []

                                            },
                                            {
                                                'id': '',
                                                'text': 'Children Other Node',
                                                'icon': '',
                                                'state': {
                                                    'opened': false,
                                                    'disabled': false,
                                                    'selected': false
                                                },
                                                'li_attr': {},
                                                'a_attr': {},
                                                'children': [{
                                                        'id': '',
                                                        'text': 'Initially selected',
                                                        'icon': '',
                                                        'state': {
                                                            'opened': false,
                                                            'disabled': false,
                                                            'selected': false
                                                        },
                                                        'li_attr': {},
                                                        'a_attr': {},
                                                        'children': []

                                                    },
                                                    {
                                                        'id': '',
                                                        'text': 'custom icon & Disable',
                                                        'icon': 'fas fa-folder-times',
                                                        'state': {
                                                            'opened': false,
                                                            'disabled': true,
                                                            'selected': false
                                                        },

                                                        'li_attr': {},
                                                        'a_attr': {},
                                                        'children': []

                                                    },
                                                    {
                                                        'id': '',
                                                        'text': 'Initially open',
                                                        'icon': '',
                                                        'state': {
                                                            'opened': true,
                                                            'disabled': false,
                                                            'selected': false
                                                        },
                                                        'li_attr': {},
                                                        'a_attr': {},
                                                        'children': [{
                                                                'id': '',
                                                                'text': 'Children Node',
                                                                'icon': '',
                                                                'state': {
                                                                    'opened': false,
                                                                    'disabled': false,
                                                                    'selected': false
                                                                },
                                                                'li_attr': {},
                                                                'a_attr': {},
                                                                'children': []

                                                            },
                                                            {
                                                                'id': '',
                                                                'text': 'Children Other Node',
                                                                'icon': '',
                                                                'state': {
                                                                    'opened': false,
                                                                    'disabled': false,
                                                                    'selected': false
                                                                },
                                                                'li_attr': {},
                                                                'a_attr': {},
                                                                'children': []

                                                            }
                                                        ]

                                                    },
                                                    {
                                                        'id': '',
                                                        'text': 'dev-theme.lione.vn',
                                                        'icon': '',
                                                        'state': {
                                                            'opened': false,
                                                            'disabled': false,
                                                            'selected': false
                                                        },
                                                        'li_attr': {},
                                                        'a_attr': {
                                                            'href': 'http://dev-theme.lione.vn/'
                                                        },
                                                        'children': []

                                                    }
                                                ]

                                            }
                                        ]

                                    },
                                    {
                                        'id': '',
                                        'text': 'dev-theme.lione.vn',
                                        'icon': '',
                                        'state': {
                                            'opened': false,
                                            'disabled': false,
                                            'selected': false
                                        },
                                        'li_attr': {},
                                        'a_attr': {
                                            'href': 'http://dev-theme.lione.vn/'
                                        },
                                        'children': []

                                    }
                                ]

                            }
                        ]

                    },
                    {
                        'id': '',
                        'text': 'dev-theme.lione.vn',
                        'icon': '',
                        'state': {
                            'opened': false,
                            'disabled': false,
                            'selected': false
                        },
                        'li_attr': {},
                        'a_attr': {
                            'href': 'http://dev-theme.lione.vn/'
                        },
                        'children': []

                    }
                ]

            }
        ]

    },
    {
        'id': '',
        'text': 'dev-theme.lione.vn',
        'icon': '',
        'state': {
            'opened': false,
            'disabled': false,
            'selected': false
        },
        'li_attr': {},
        'a_attr': {
            'href': 'http://dev-theme.lione.vn/'
        },
        'children': []

    }
];


var Treeview = {
    init: function() {
        jQuery('.tree-viewer').each(function() {
            let obj = jQuery(this);
            let target = obj.closest('[data-scrol="true"]')[0];
            obj.jstree({
                "core": {
                    "themes": {
                        "responsive": false,
                        "dots": false,
                        "variant": "xs"
                    },
                    "data": demoData
                },
                "types": {
                    "default": {
                        "icon": "fa fa-folder text-warning"
                    },
                    "file": {
                        "icon": "fa fa-file  text-warning"
                    }
                },
                "plugins": ["types"]
            });
            // handle link clicks in tree nodes(support target="_blank" as well)
            obj.on('select_node.jstree', function(e, data) {
                var link = $('#' + data.selected).find('a');
                if (link.attr("href") != "#" && link.attr("href") != "javascript:;" && link.attr("href") != "") {
                    document.location.href = link.attr("href");
                    return false;
                }
            });
            obj.on('ready.jstree', function() {
                KTUtil.scrollInit(target, {
                    wheelPropagation: true,
                    suppressScrollY: true
                });
            });
            obj.on('after_open.jstree', function() {
                KTUtil.scrollInit(target, {
                    wheelPropagation: true,
                    suppressScrollY: true
                });
            });
            obj.on('after_close.jstree', function() {
                KTUtil.scrollInit(target, {
                    wheelPropagation: true,
                    suppressScrollY: true
                });
            });

        });




    }
};

jQuery(document).ready(function() {
    Treeview.init();
});