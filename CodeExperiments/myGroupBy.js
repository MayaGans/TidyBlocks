var iris = [
    { Sepal_Length: 1, Sepal_Width: 3.2, Species: "setosa" },
    { Sepal_Length: 1, Sepal_Width: 3.2, Species: "viridis" },
    { Sepal_Length: 1, Sepal_Width: 3.2, Species: "virsicolor" },
    { Sepal_Length: 2, Sepal_Width: 3.2, Species: "setosa" },
    { Sepal_Length: 1, Sepal_Width: 3.2, Species: "viridis" },
    { Sepal_Length: 2, Sepal_Width: 3.2, Species: "virsicolor" }];

var myGroupBy = function (df, column) {

    var arr = column.map(i => 'o.' + i).join(" + ")

    indices = Object.create(null),
        max = 0,
        result = df.map(o => Object.assign(
            {},
            o,
            { index: indices[eval(arr)] = indices[eval(arr)] || ++max }
        ));
        console.log(result)
}

myGroupBy(iris, ["Species", "Sepal_Length"])