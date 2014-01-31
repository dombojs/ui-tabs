
var ui = require('ui');

ui('tabs', {
    active: 0
}, function($, el, o) {

    var nav = el.find('.Tabs-nav'),
        ul = nav.children(),
        li = ul.children(),
        links = li.children(),
        panels = el.find('.Tabs-panel'),
        active = null;

    ul.attr('role', 'tablist');
    li.attr('role', 'presentation');

    links.forEach(function(el, i) {

        var tab = $(this),
            tabId = ui.id(this),
            panel = panels.eq(i),
            panelId = ui.id(panel[0]);

        tab.attr('role', 'tab')
            .attr('aria-controls', panelId)
            .on('click', function(e) {
                e.preventDefault();
                show(i);
            });

        panel.attr('role', 'tabpanel')
            .attr('aria-labelledby', tabId)
            .children().first().attr('tabindex', 0);

    });

    function show(i) {
        if (i === active) return; 
        active = i;
        links.attr('aria-expanded', 'false')
            .attr('aria-selected', 'false')
            .removeClass('is-active')
        .eq(i)
            .attr('aria-expanded', 'true')
            .attr('aria-selected', 'true')
            .addClass('is-active');
        panels.hide().eq(i).show();
    }

    show(o.active || 0);

});