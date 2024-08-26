var chart_custom_drilldown = [{
    "y": 24,
    "color": "#c33825",
    "drilldown": {
        "categories": ["Hoàn thành", "Còn lại"],
        "name": "CN.HN",
        "money_data": [2000000, 2000000],
        "data": [12, 12]
    },
    "plan": 4000000,
    "name": "Tên"
}, {
    "y": 14,
    "color": "#0000bf",
    "drilldown": {
        "categories": ["Hoàn thành", "Còn lại"],
        "name": "CN. HCM",
        "money_data": [1371428, 1028572],
        "data": [8, 6]
    },
    "plan": 2400000,
    "name": "Tên 2"
}, {
    "y": 62,
    "color": "#a0d468",
    "drilldown": {
        "categories": ["Hoàn thành", "Còn lại"],
        "name": "Chi nhánh QN",
        "money_data": [3185806, 6690194],
        "data": [20, 42]
    },
    "plan": 9876000,
    "name": "Tên 3"
}];

var ce_column_chart = {
    "categories": ["Qúy 1", "Qúy 2", "Qúy 3", "Qúy 4"],
    "series": [{
        "name": "Dự kiến",
        "data": [22, 57, 76, 9],
        "color": "#a0d468"
    }, {
        "name": "Thực tế",
        "data": [11, 56, 29, 6],
        "color": "#5db2ff"
    }],
    "text": ""
};
jQuery(document).ready(function() {
    //jQuery('.module-items').slick();
});