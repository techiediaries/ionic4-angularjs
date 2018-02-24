var ItemReorder = /** @class */ (function () {
    function ItemReorder() {
    }
    ItemReorder.prototype.hostData = function () {
        return {
            attrs: {
                'reorderAnchor': '',
            }
        };
    };
    ItemReorder.prototype.render = function () {
        return h("ion-icon", { "a": { "name": 'reorder' } });
    };
    return ItemReorder;
}());
export { ItemReorder };
