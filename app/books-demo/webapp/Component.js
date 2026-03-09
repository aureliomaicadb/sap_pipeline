sap.ui.define(
    [
        "sap/fe/core/AppComponent",
        "sap/ui/dom/includeStylesheet"
    ],
    function (Component, includeStylesheet) {
        "use strict";

        return Component.extend("booksdemo.Component", {
            metadata: {
                manifest: "json"
            },

            init: function () {
                includeStylesheet(sap.ui.require.toUrl("booksdemo/css/style.css"));
                Component.prototype.init.apply(this, arguments);
            }
        });
    }
);