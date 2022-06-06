const v1 = "{{this.imagen}}"
Handlebars.registerHelper('ifCond', function (v1, options) {
    if (v1 != '') {
        return options.fn(this);
    } else {
    return options.inverse(this);
    }
});