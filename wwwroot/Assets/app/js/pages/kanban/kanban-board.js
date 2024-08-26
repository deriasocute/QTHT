"use strict";

// Class definition
var KTKanbanBoardDemo = function() {

    var _demokanban = function() {
        var kanban = new jKanban({
            element: '#kt_kanban',
            gutter: '0',
            boards: [{
                    'id': '_todo',
                    'title': `<div class="kanban__header d-flex align-items-center justify-content-between">
                                    <div class="kanban__header--info d-flex align-items-center">
                                        <span>Chưa xử lý</span><span class="kanban__header--counter label label-rounded label-white ml-3"></span>
                                    </div>
                                    <div class="kanban__header--arrow cursor-pointer"><i class="fas text-white fa-angle-down"></i></div>
                                </div>`,
                    'class': 'info',
                    'dragTo': ['_doing', '_reject'],
                    'item': [{
                            'title': KanbanItem_Template,
                        },
                        {
                            'title': KanbanItem_Template,
                        }
                    ]
                },
                {
                    'id': '_doing',
                    'title': `<div class="kanban__header d-flex align-items-center justify-content-between">
                                <div class="kanban__header--info d-flex align-items-center">
                                    <span>Đang xử lý</span><span class="kanban__header--counter label label-rounded label-white ml-3"></span>
                                </div>
                                <div class="kanban__header--arrow cursor-pointer"><i class="fas text-white fa-angle-down"></i></div>
                            </div>`,
                    'class': 'primary',
                    'item': [{
                            'title': KanbanItem_Template,
                        },
                        {
                            'title': KanbanItem_Template,
                        }
                    ]
                },
                {
                    'id': '_reject',
                    'title': `<div class="kanban__header d-flex align-items-center justify-content-between">
                                <div class="kanban__header--info d-flex align-items-center">
                                    <span>Từ chối</span><span class="kanban__header--counter label label-rounded label-white ml-3"></span>
                                </div>
                                <div class="kanban__header--arrow cursor-pointer"><i class="fas text-white fa-angle-down"></i></div>
                            </div>`,
                    'class': 'danger',
                    'item': [{
                            'title': KanbanItem_Template,
                        },
                        {
                            'title': KanbanItem_Template,
                        }
                    ]
                },
                {
                    'id': '_pause',
                    'title': `<div class="kanban__header d-flex align-items-center justify-content-between">
                                <div class="kanban__header--info d-flex align-items-center">
                                    <span>Tạm dừng</span><span class="kanban__header--counter label label-rounded label-white ml-3"></span>
                                </div>
                                <div class="kanban__header--arrow cursor-pointer"><i class="fas text-white fa-angle-down"></i></div>
                            </div>`,
                    'class': 'warning',
                    'item': [{
                            'title': KanbanItem_Template,
                        },
                        {
                            'title': KanbanItem_Template,
                        }
                    ]
                },
                {
                    'id': '_done',
                    'title': `<div class="kanban__header d-flex align-items-center justify-content-between">
                                <div class="kanban__header--info d-flex align-items-center">
                                    <span>Hoàn thành</span><span class="kanban__header--counter label label-rounded label-white ml-3"></span>
                                </div>
                                <div class="kanban__header--arrow cursor-pointer"><i class="fas text-white fa-angle-down"></i></div>
                            </div>`,
                    'class': 'success',
                    'item': [{
                            'title': KanbanItem_Template,
                        },
                        {
                            'title': KanbanItem_Template,
                        }
                    ]
                }
            ],
            dragBoards: false,
            gutter: '8px',
            widthBoard: '270px',
            dropEl: function(el, target, source, sibling) {
                Kanban__Counter();
            }
        });

        var toDoButton = document.getElementById('addToDo');
        toDoButton.addEventListener('click', function() {
            kanban.addElement(
                '_todo', {
                    'title': KanbanItem_Template
                }
            );
            Kanban__Counter();
        });

        var removeBoard = document.getElementById('removeBoard');
        removeBoard.addEventListener('click', function() {
            kanban.removeBoard('_done');
        });
    }

    // Public functions
    return {
        init: function() {
            if (jQuery('#kt_kanban').length != 0) {
                _demokanban();
            }

        }
    };
}();

function Kanban__Counter() {
    jQuery('.kanban__header--counter').each(function() {
        jQuery(this).html('');
        var items = jQuery(this).parents('header').next('main').find('.kanban-item').length;
        jQuery(this).html(items);
    })
}
jQuery(document).ready(function() {
    KTKanbanBoardDemo.init();
    Kanban__Counter();
    jQuery(document).on('click', '.kanban__header--arrow', function() {
        jQuery(this).find('i').toggleClass('fa-angle-down fa-angle-right');
        jQuery(this).parents('header').next('main').slideToggle(300);
        jQuery(this).parents('header').toggleClass('kanban__header--closed');
    });
    jQuery(document).on('click', '.kanban-link', function() {
        var url = jQuery(this).attr('href');
        window.location.href = url;
    });
});