import {ReadItemList} from "../js/lib.js";

test('if we add testItem1(Object) to readItemList, then we get an array readItemList.items that contains 1 element - our Object', () => {
    const testItem1 = {id: '0', name: 'how to write server', tags: ['#node.js', '#server'], url: 'http://localhost:3000', done: false};
    const readItemList = new ReadItemList();
    readItemList.add(testItem1);
    const result = readItemList.items;
    expect(result).toEqual([{id:"0", name: "how to write server", tags: ["#node.js", "#server"], url: "http://localhost:3000", done: false}]);
});