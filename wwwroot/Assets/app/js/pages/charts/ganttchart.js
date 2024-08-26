var Cust = {
        gantt_task_resize: function() {
            var gantt_here_w = jQuery("#gantt_here").width();
            var gantt_grid_w = jQuery(".gantt_grid").width();
            jQuery(document).find(".gantt_task_resize").css('width', gantt_here_w - gantt_grid_w);
        }
    }
    //--DOCUMENT READY FUNCTION BEGIN
$(document).ready(function() {
    //-- GANTT DATA
    //============================================================ -->
    var tasks = {
        data: [{
                id: 1,
                text: "Dự án 1",
                start_date: "11-11-2017",
                duration: 12,
                progress: 0.6,
                open: true,
                users: ["Đông LV", "Đông NP", "Tuân NC"]
            },
            {
                id: 2,
                text: "Công việc 1",
                start_date: "11-11-2017",
                duration: 2,
                progress: 1,
                open: true,
                users: ["Đông LV", "Dũng TV", "Đắc Phạm"],
                parent: 1
            },
            {
                id: 3,
                text: "Công việc 2",
                start_date: "12-11-2017",
                duration: 3,
                progress: 0.5,
                open: true,
                users: ["An Phạm", "Quang NĐ"],
                parent: 1
            },
            {
                id: 4,
                text: "Công việc 2.0",
                start_date: "14-11-2017",
                duration: 5,
                progress: 0.2,
                open: true,
                users: ["An Phạm", "Quang NĐ", "Đông LV"],
                parent: 3
            },
            {
                id: 5,
                text: "Công việc 2.1",
                start_date: "14-11-2017",
                duration: 4,
                progress: 1,
                open: true,
                users: ["Đông LV"],
                parent: 3
            },
            {
                id: 6,
                text: "Công việc 2.2",
                start_date: "18-11-2017",
                duration: 5,
                progress: 0.8,
                open: true,
                users: ["Dũng TV"],
                parent: 3
            },
            {
                id: 7,
                text: "Công việc 2.3",
                start_date: "20-11-2017",
                duration: 3,
                progress: 0.2,
                open: true,
                users: ["Quang NĐ", "Tuân NC"],
                parent: 3
            }
        ]
    };
    //-- GANTT COLUMNS
    //============================================================ -->
    gantt.config.columns = [{
            name: "text",
            label: "Tên công việc",
            width: "250",
            tree: true
        },
        {
            name: "start_date",
            label: "Ngày bắt đầu",
            width: "100"
        },
        {
            name: "duration",
            label: "Số ngày dự tính",
            width: "100",
            align: "center"
        },
        {
            name: "progress",
            label: "Trạng thái",
            template: function(obj) {
                return Math.round(obj.progress * 100) + "%";
            },
            align: "center",
            width: 70
        },
        {
            name: "users",
            label: "Người thực hiện",
            //template: function(item){ return byId(gantt.serverList('user'), item.user) },
            template: function(item) {
                if (!item.users) return "Trống";
                return item.users.join(", ");
            },
            align: "left",
            width: 200
        }

    ];
    //-- GANTT TOOLTIP
    //============================================================ -->
    gantt.templates.tooltip_text = function(start, end, task) {
        return "<b class='tooltip_text_b'>Tên công việc:</b> " + task.text + "<br/><b class='tooltip_text_b'>Ngày bắt đầu:</b> " +
            gantt.templates.tooltip_date_format(start) +
            "<br/><b class='tooltip_text_b'>Ngày kết thúc:</b> " + gantt.templates.tooltip_date_format(end) +
            "<br/><b class='tooltip_text_b'>Người thực hiện:</b> " + task.users;
    };
    //-- GANTT FILTER
    //============================================================ -->
    gantt.attachEvent("onBeforeTaskDisplay", function(id, task) {
        if (gantt_filter)
            if (task.priority != gantt_filter)
                return false;

        return true;
    });
    gantt.templates.scale_cell_class = function(date) {
        if (date.getDay() == 0 || date.getDay() == 7) {
            return "sunday";
        } else if (date.getDay() == 0 || date.getDay() == 6) {
            return "satday";
        }
    };
    gantt.templates.task_cell_class = function(item, date) {
        if (date.getDay() == 0 || date.getDay() == 7) {
            return "sunday";
        } else if (date.getDay() == 0 || date.getDay() == 6) {
            return "satday";
        }
    };
    var gantt_filter = 0;

    function show_scale_options(mode) {
        //something here
    }

    function set_scale_units(mode) {
        if (mode && mode.getAttribute) {
            mode = mode.getAttribute("value");
        }
        gantt.render();
    }

    function zoom_tasks(node) {
        switch (node.value) {
            case "week":
                gantt.config.scale_unit = "day";
                gantt.config.date_scale = "%d %M";

                gantt.config.scale_height = 60;
                gantt.config.min_column_width = 70;
                gantt.config.subscales = [{
                    unit: "hour",
                    step: 1,
                    date: "%H:%i"
                }];
                show_scale_options("hour");
                break;
            case "trplweek":
                gantt.config.min_column_width = 70;
                gantt.config.scale_unit = "day";
                gantt.config.date_scale = "%d %M";
                gantt.config.subscales = [{
                    unit: "week",
                    step: 1,
                    date: "Tuần %W"
                }];
                gantt.config.scale_height = 60;
                show_scale_options("day");
                break;
            case "month":
                gantt.config.min_column_width = 70;
                gantt.config.scale_unit = "week";
                gantt.config.date_scale = "Week #%W";
                gantt.config.subscales = [{
                    unit: "day",
                    step: 1,
                    date: "%D"
                }];
                show_scale_options();
                gantt.config.scale_height = 60;
                break;
            case "year":
                gantt.config.min_column_width = 70;
                gantt.config.scale_unit = "month";
                gantt.config.date_scale = "%M";
                gantt.config.scale_height = 60;
                show_scale_options();
                gantt.config.subscales = [{
                    unit: "week",
                    step: 1,
                    date: "Tuần %W"
                }];
                break;
        }
        set_scale_units();
        gantt.render();
    }
    show_scale_options("day");
    gantt.config.subscales = [{
        unit: "week",
        step: 1,
        date: "Tuần %W"
    }];
    gantt.config.scale_height = 60;


    //-- GANTT Marker
    //============================================================ -->
    var date_to_str = gantt.date.date_to_str(gantt.config.task_date);
    var d = new Date();
    var month = d.getMonth() + 1;
    var day = d.getDate();
    var today = new Date(d.getFullYear(), (month < 10 ? '0' : '') + month - 1, (day < 10 ? '0' : '') + day);

    gantt.addMarker({
        start_date: today,
        css: "today",
        text: "Hôm nay",
        title: date_to_str(today)
    });
    var start = new Date(2017, 11 - 1, 11);
    gantt.addMarker({
        start_date: start,
        css: "status_line",
        text: "Bắt đầu dự án",
        title: "Bắt đầu dự án: " + date_to_str(start)
    });

    //-- GANTT CONFIG
    //============================================================ -->
    gantt.templates.task_text = function(start, end, task) {
        return "";
    };
    gantt.config.task_height = 10;
    gantt.config.show_links = false;
    gantt.config.drag_progress = false;
    gantt.config.drag_resize = false;
    gantt.config.drag_move = false;
    gantt.config.order_branch = true;
    gantt.config.order_branch_free = true;
    gantt.config.details_on_dblclick = false;
    gantt.config.min_grid_column_width = 100;
    if (jQuery("#gantt_here").is(":visible")) {
        gantt.init("gantt_here");
        gantt.parse(tasks);
    }

    //-- GANTT ACTION
    //============================================================ -->
    jQuery("#fullscreen_button").click(function() {
        if (!gantt.getState().fullscreen) {
            gantt.expand();

        } else {
            gantt.collapse();

        }
    });
    jQuery('.zoom_tasks_this').click(function() {
        zoom_tasks(this);
    });
    jQuery('.set_scale_units_this').click(function() {
        set_scale_units(this);
    });

    jQuery(document).find(".gantt_container > .gantt_task").wrapAll('<div class="gantt_task_resize"></div>');
    //Cust.gantt_task_resize();
    // jQuery(document).find(".gantt_grid").resizable({
    //     resize: function(event, ui) {
    //         Cust.gantt_task_resize();
    //     }
    // });
    gantt.attachEvent("onTaskDrag", function(id, mode, task, original) {
        var modes = gantt.config.drag_mode;
        if (mode == modes.move) {
            var diff = task.start_date - original.start_date;
            gantt.eachTask(function(child) {
                child.start_date = new Date(+child.start_date + diff);
                child.end_date = new Date(+child.end_date + diff);
                gantt.refreshTask(child.id, true);
            }, id);
        }
    });
    //rounds positions of the child items to scale
    gantt.attachEvent("onAfterTaskDrag", function(id, mode, e) {
        var modes = gantt.config.drag_mode;
        if (mode == modes.move) {
            var state = gantt.getState();
            gantt.eachTask(function(child) {
                child.start_date = gantt.roundDate({
                    date: child.start_date,
                    unit: state.scale_unit,
                    step: state.scale_step
                });
                child.end_date = gantt.calculateEndDate(child.start_date,
                    child.duration, gantt.config.duration_unit);
                gantt.updateTask(child.id);
            }, id);
        }
    });



    //-- WORKFLOW
    //============================================================ -->

    function workflow_init() {
        var $ = go.GraphObject.make; // for conciseness in defining templates
        myDiagram =
            $(go.Diagram, "myDiagramDiv", // must name or refer to the DIV HTML element
                {
                    initialContentAlignment: go.Spot.Center,
                    allowDrop: true, // must be true to accept drops from the Palette
                    "LinkDrawn": showLinkLabel, // this DiagramEvent listener is defined below
                    "LinkRelinked": showLinkLabel,
                    "animationManager.isEnabled": false,
                    "undoManager.isEnabled": true // enable undo & redo
                });

        function nodeStyle() {
            return [
                new go.Binding("location", "loc", go.Point.parse).makeTwoWay(go.Point.stringify),
                {
                    locationSpot: go.Spot.Center,
                    //isShadowed: true,
                    //shadowColor: "#888",
                    mouseEnter: function(e, obj) {
                        showPorts(obj.part, true);
                    },
                    mouseLeave: function(e, obj) {
                        showPorts(obj.part, false);
                    }
                }
            ];
        }

        function makePort(name, spot, output, input) {
            return $(go.Shape, "Circle", {
                fill: "transparent",
                stroke: null, // this is changed to "white" in the showPorts function
                desiredSize: new go.Size(8, 8),
                alignment: spot,
                alignmentFocus: spot, // align the port on the main Shape
                portId: name, // declare this object to be a "port"
                fromSpot: spot,
                toSpot: spot, // declare where links may connect at this port
                fromLinkable: output,
                toLinkable: input, // declare whether the user may draw links to/from here
                cursor: "pointer" // show a different cursor to indicate potential link point
            });
        }
        var lightText = 'whitesmoke';
        myDiagram.nodeTemplateMap.add("", // the default category
            $(go.Node, "Spot", nodeStyle(),
                $(go.Panel, "Auto",
                    $(go.Shape, "Rectangle", {
                            fill: "#00A9C9",
                            stroke: null
                        },
                        new go.Binding("figure", "figure")),
                    $(go.TextBlock, {
                            font: "bold 11pt Helvetica, Arial, sans-serif",
                            stroke: lightText,
                            margin: 8,
                            maxSize: new go.Size(160, NaN),
                            wrap: go.TextBlock.WrapFit,
                            editable: true
                        },
                        new go.Binding("text").makeTwoWay())
                ),
                // four named ports, one on each side:
                makePort("T", go.Spot.Top, false, true),
                makePort("L", go.Spot.Left, true, true),
                makePort("R", go.Spot.Right, true, true),
                makePort("B", go.Spot.Bottom, true, false)
            ));
        myDiagram.nodeTemplateMap.add("Start",
            $(go.Node, "Spot", nodeStyle(),
                $(go.Panel, "Auto",
                    $(go.Shape, "Circle", {
                        minSize: new go.Size(40, 40),
                        fill: "#79C900",
                        stroke: null
                    }),
                    $(go.TextBlock, "Start", {
                            font: "bold 11pt Helvetica, Arial, sans-serif",
                            stroke: lightText,
                            editable: true,
                        },
                        new go.Binding("text"))
                ),
                // three named ports, one on each side except the top, all output only:
                makePort("L", go.Spot.Left, true, false),
                makePort("R", go.Spot.Right, true, false),
                makePort("B", go.Spot.Bottom, true, false)
            ));
        myDiagram.nodeTemplateMap.add("End",
            $(go.Node, "Spot", nodeStyle(),
                $(go.Panel, "Auto",
                    $(go.Shape, "Circle", {
                        minSize: new go.Size(40, 40),
                        fill: "#DC3C00",
                        stroke: null
                    }),
                    $(go.TextBlock, "End", {
                            font: "bold 11pt Helvetica, Arial, sans-serif",
                            stroke: lightText,
                            editable: true,
                        },
                        new go.Binding("text"))
                ),
                // three named ports, one on each side except the bottom, all input only:
                makePort("T", go.Spot.Top, false, true),
                makePort("L", go.Spot.Left, false, true),
                makePort("R", go.Spot.Right, false, true)
            ));
        myDiagram.nodeTemplateMap.add("Comment",
            $(go.Node, "Auto", nodeStyle(),
                $(go.Shape, "File", {
                    fill: "#EFFAB4",
                    stroke: null
                }),
                $(go.TextBlock, {
                        margin: 5,
                        maxSize: new go.Size(200, NaN),
                        wrap: go.TextBlock.WrapFit,
                        textAlign: "center",
                        editable: true,
                        font: "bold 12pt Helvetica, Arial, sans-serif",
                        stroke: '#454545'
                    },
                    new go.Binding("text").makeTwoWay())
                // no ports, because no links are allowed to connect with a comment
            ));
        // replace the default Link template in the linkTemplateMap
        myDiagram.linkTemplate =
            $(go.Link, // the whole link panel
                {
                    routing: go.Link.AvoidsNodes,
                    curve: go.Link.JumpOver,
                    corner: 5,
                    toShortLength: 4,
                    relinkableFrom: true,
                    relinkableTo: true,
                    reshapable: true,
                    resegmentable: true,
                    // mouse-overs subtly highlight links:
                    mouseEnter: function(e, link) {
                        link.findObject("HIGHLIGHT").stroke = "rgba(30,144,255,0.2)";
                    },
                    mouseLeave: function(e, link) {
                        link.findObject("HIGHLIGHT").stroke = "transparent";
                    }
                },
                new go.Binding("points").makeTwoWay(),
                $(go.Shape, // the highlight shape, normally transparent
                    {
                        isPanelMain: true,
                        strokeWidth: 8,
                        stroke: "transparent",
                        name: "HIGHLIGHT"
                    }),
                $(go.Shape, // the link path shape
                    {
                        isPanelMain: true,
                        stroke: "gray",
                        strokeWidth: 2
                    }),
                $(go.Shape, // the arrowhead
                    {
                        toArrow: "standard",
                        stroke: null,
                        fill: "gray"
                    }),
                $(go.Panel, "Auto", // the link label, normally not visible
                    {
                        visible: false,
                        name: "LABEL",
                        segmentIndex: 2,
                        segmentFraction: 0.5
                    },
                    new go.Binding("visible", "visible").makeTwoWay(),
                    $(go.Shape, "RoundedRectangle", // the label shape
                        {
                            fill: "#F8F8F8",
                            stroke: null
                        }),
                    $(go.TextBlock, "Yes", // the label
                        {
                            textAlign: "center",
                            font: "10pt helvetica, arial, sans-serif",
                            stroke: "#333333",
                            editable: true
                        },
                        new go.Binding("text").makeTwoWay())
                )
            );

        function showLinkLabel(e) {
            var label = e.subject.findObject("LABEL");
            if (label !== null) label.visible = (e.subject.fromNode.data.figure === "Diamond");
        }
        // temporary links used by LinkingTool and RelinkingTool are also orthogonal:
        myDiagram.toolManager.linkingTool.temporaryLink.routing = go.Link.Orthogonal;
        myDiagram.toolManager.relinkingTool.temporaryLink.routing = go.Link.Orthogonal;

        workflow_load(); // load an initial diagram from some JSON text
        function customFocus() {
            var x = window.scrollX || window.pageXOffset;
            var y = window.scrollY || window.pageYOffset;
            go.Diagram.prototype.doFocus.call(this);
            window.scrollTo(x, y);
        }
        myDiagram.doFocus = customFocus;
    } // end init

    // Make all ports on a node visible when the mouse is over the node
    function showPorts(node, show) {
        var diagram = node.diagram;
        if (!diagram || diagram.isReadOnly || !diagram.allowLink) return;
        node.ports.each(function(port) {
            port.stroke = (show ? "white" : null);
        });
    }
    // Show the diagram's model in JSON format that the user may edit
    function workflow_save() {
        document.getElementById("mySavedModel").value = myDiagram.model.toJson();
        myDiagram.isModified = false;
    }

    function workflow_load() {
        myDiagram.model = go.Model.fromJson(document.getElementById("mySavedModel").value);
    }
    var start_temp_click = -1;
    jQuery('.workflow_action .start_temp').on("click", function() {
        start_temp_click = start_temp_click + 1;
        var data = $('#mySavedModel').text(),
            arr = data.split('['),
            key = data.split('{"key":'),
            insertkey = key.length + 1,
            insert_text = '{"key":' + insertkey + ', "category":"Start", "loc":"' + parseInt(-315) + ' ' + parseInt(start_temp_click * 105) + '", "text":"Tiêu đề"},';
        $("#mySavedModel").text(arr[0] + "[" + insert_text + arr[1] + "[" + arr[2]);
        workflow_load();
    });

    var end_temp_click = -1;
    jQuery('.workflow_action .end_temp').on("click", function() {
        end_temp_click = end_temp_click + 1;
        var data = $('#mySavedModel').text(),
            arr = data.split('['),
            key = data.split('{"key":'),
            insertkey = key.length + 1,
            insert_text = '{"key":' + insertkey + ', "category":"End", "loc":"' + parseInt(-210) + ' ' + parseInt(end_temp_click * 105) + '", "text":"Tiêu đề"},';
        $("#mySavedModel").text(arr[0] + "[" + insert_text + arr[1] + "[" + arr[2]);
        workflow_load();
    });
    var info_temp_click = -1;
    jQuery('.workflow_action .info_temp').on("click", function() {
        info_temp_click = info_temp_click + 1;
        var data = $('#mySavedModel').text(),
            arr = data.split('['),
            key = data.split('{"key":'),
            insertkey = key.length + 1,
            insert_text = '{"key":' + insertkey + ', "loc":"' + parseInt(-105) + ' ' + parseInt(info_temp_click * 105) + '", "text":"Tiêu đề"},';
        $("#mySavedModel").text(arr[0] + "[" + insert_text + arr[1] + "[" + arr[2]);
        workflow_load();
    });

    jQuery('.workflow_save').click(function() {
        workflow_save();
    });

    jQuery('.workflow_load').click(function() {
        workflow_load();
    });
    if (jQuery(document).find("#myDiagramDiv").is(":visible")) {
        workflow_init();
    }



}); //--DOCUMENT READY FUNCTION END


//--WINDOW BIND LOAD FUNCTION BEGIN
$(window).bind("load", function() {
    //something here!
});
//--WINDOW BIND LOAD FUNCTION END

//--WINDOW RESIZE FUNCTION BEGIN
$(window).resize(function() {
    //something here!
    if (jQuery("#gantt_here").is(":visible")) {
        //gantt.init("gantt_here");
    }
});
//--WINDOW RESIZE FUNCTION END