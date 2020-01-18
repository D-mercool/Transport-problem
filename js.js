var m = 3;
var n = 3;
var tableDano = [[1,2,3,150], [2,5,4,50], [3,4,1,100], [200,50,50]];
var plan = [];
var pot = [];
var u = [];
var v = [];

for (var i = 0; i < m; i++) {
    u[i] = '';
}
for (var i = 0; i < n; i++) {
    v[i] = '';
}

u[0] = '0';

function inputPlanAndPot() {
    for ( var i = 0; i < m; i++) {
        pot.push([0]);
        plan.push([0]);
    }
    for (var i = 0; i< m; i++) {
        for (var j = 0; j < n-1; j++) {
            pot[i].push(0);
            plan[i].push(0);
        }
    }
}

function copY() {
    var table = [];
    for (var i = 0; i < tableDano.length; i++){
        table[i] = tableDano[i].slice();
    }
    return table;
}

function checkTable(table) {
    for (var i = 0; i < table.length; i++) {
        for (var j = 0; j < table[i].length; j++) {
            if (table[i][j] == 0) {
                continue;
            }
            else {
                return false;
            }
        }
    }
    return true;
}

function checkPlan() {
    var s = m + n - 1;
    var summa = 0;
    for (var i = 0; i < plan.length; i++) {
        for (var j = 0; j < plan[i].length; j++) {
            if (plan[i][j] > 0) {
                summa += 1;
            }
        }
    }
    var k = s - summa;
    while (k > 0) {
        for (var i = 0; i < plan.length; i++) {
            for (var j = 0; j < plan[i]; j++) {
                if (plan[i][j] == 0) {
                    plan[i][j] = 1;
                    console.log(plan);
                    break;
                }
            }
            break;
        }
        k -= 1;
    }
}

function checkPotential() {
    for (var i = 0; i < pot.length; i++) {
        for (var j = 0; j < pot[i].length; j++) {
            if (pot[i][j] > 0) {
                console.log('План не оптимальный, нужно улучшить!');
                return false;
            }
        }
    }
    console.log('План оптимальный!');
    return true;
}

function minElement(table) {
    var m = 1000,
        indexI = 0,
        indexJ = 0;
    for (var i = 0; i < table.length - 1; i++) {
        for (var j = 0; j < table[i].length - 1; j++) {
            if (table [i][j] < m && table [i][j] > 0) {
                m = table[i][j];
                indexI = i;
                indexJ = j;
            }
        }
    }
    table[indexI][indexJ] = 0;
    return [indexI, indexJ];
}

function writePlan() {
    var table = copY();
    while (!checkTable(table)) {
        var index = minElement(table);
        var indexI = index[0],
            indexJ = index[1];
        if (table[indexI][table[indexI].length - 1] != 0 && table[table.length - 1][indexJ] != 0) {
            if (table[indexI][table[indexI].length - 1] >= table[table.length - 1][indexJ]) {
                plan[indexI][indexJ] = table[table.length -1][indexJ];
                table[indexI][table[indexI].length - 1] -= table[table.length - 1][indexJ];
                table[table.length - 1][indexJ] -= table[table.length - 1][indexJ];
            }
            else {
                plan[indexI][indexJ] = table[indexI][table[indexI].length - 1];
                table[table.length -1][indexJ] -= table[indexI][table[indexI].length - 1];
                table[indexI][table[indexI].length - 1] -= table[indexI][table[indexI].length - 1];
            }
        }
    }
}

function potential() {
    checkPlan();
    var n = 100;

    while (n >= 1) {
        for (var i = 0; i < plan.length; i++) {
            for (var j = 0; j < plan[i].length; j++) {
                if (plan[i][j] > 0) {
                    if (u[i] != '' && v[j] == '') {
                        v[j] = String(tableDano[i][j] - Number(u[i]));
                    }
                    else if (u[i] == '' && v[j] == '') {
                        continue;
                    }
                    else if (u[i] != '' && v[j] != '') {
                        continue;
                    }
                    else if (u[i] == '' && v[j] != '') {
                        u[i] = String(tableDano[i][j] - Number(v[j]));
                    }
                }
            }
        }
        n -= 1;
    }

    for (var i = 0; i < plan.length; i++) {
        for (var j = 0; j < plan[i].length; j++) {
            if (plan[i][j] == 1) {
                plan[i][j] = 0;
            }
        }
    }
}

function potentialWrite() {
    for (var i = 0; i < plan.length; i++) {
        for (var j = 0; j < plan[i].length; j++) {
            if (plan[i][j] == 0) {
                pot[i][j] = (Number(u[i]) + Number(v[j]) - tableDano[i][j]);
            }
        }
    } 
}

inputPlanAndPot();
writePlan();
potential();
potentialWrite();
checkPotential();
console.log(plan);













