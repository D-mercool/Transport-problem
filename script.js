var Table = {
    cost: {},
    values: [],
    needs: [],
    reserves: [],
};

var m = 2; //строки 
var n = 2; //столбцы
var tableDano = [];
var plan = [];
var pot = [];
var u = [];
var v = [];

var btn = document.getElementById('btn');

function Input() {
    var t = [];
    for (var i = 0; i < m; i++) {
        t.push([]);
        for (var j = (i * n + 1); j < (i * n + 1) + n; j++) {
            t[i].push(Table.cost[j]);
        }
        t[i].push(Table.needs[i]);
    }

    t.push([]);
    for (var i = 0; i < n; i++) {
        t[m].push(Table.reserves[i]);
    }
    return t;
}


function checkInput() {
    for (var i = 0; i < tableDano.length; i++) {
        if (tableDano[i].indexOf('error') == -1) {
            continue;
        } else {
            return false;
        }
    }
    return true;
}

function checkSum() {
    var s1 = 0;
    var s2 = 0;
    for (let i = 0; i < Table.needs.length; i++) {
        s1 += Table.needs[i];
    }
    for (let i = 0; i < Table.reserves.length; i++) {
        s2 += Table.reserves[i];
    }

    if (s1 == s2) {
        document.getElementById('sum').textContent = 'S = ' + String(s1);
        return true;
    } else {
        return false;
    }
}

function start() {

    for (var i = 0; i < m; i++) {
        u[i] = '';
    }
    for (var i = 0; i < n; i++) {
        v[i] = '';
    }

    u[0] = '0';

    function inputPlanAndPot() {
        for (var i = 0; i < m; i++) {
            pot.push([0]);
            plan.push([0]);
        }
        for (var i = 0; i < m; i++) {
            for (var j = 0; j < n-1; j++) {
                pot[i].push(0);
                plan[i].push(0);
            }
        }
    }

    function copY() {
        var table = [];
        for (var i = 0; i < tableDano.length; i++) {
            table[i] = tableDano[i].slice();
        }
        return table;
    }

    function checkTable(table) {
        for (var i = 0; i < table.length; i++) {
            for (var j = 0; j < table[i].length; j++) {
                if (table[i][j] == 0) {
                    continue;
                } else {
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
                    alert('План не оптимальный, нужно улучшить!');
                    print();
                    return false;
                }
            }
        }
        alert('План оптимальный!');
        print();
        return true;
    }

    function minElement(table) {
        var m = 1000,
            indexI = 0,
            indexJ = 0;
        for (var i = 0; i < table.length - 1; i++) {
            for (var j = 0; j < table[i].length - 1; j++) {
                if (table[i][j] < m && table[i][j] > 0) {
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
                    plan[indexI][indexJ] = table[table.length - 1][indexJ];
                    table[indexI][table[indexI].length - 1] -= table[table.length - 1][indexJ];
                    table[table.length - 1][indexJ] -= table[table.length - 1][indexJ];
                } else {
                    plan[indexI][indexJ] = table[indexI][table[indexI].length - 1];
                    table[table.length - 1][indexJ] -= table[indexI][table[indexI].length - 1];
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
                        } else if (u[i] == '' && v[j] == '') {
                            continue;
                        } else if (u[i] != '' && v[j] != '') {
                            continue;
                        } else if (u[i] == '' && v[j] != '') {
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
                    pot[i][j] = (Number(u[i]) + Number(v[j]) - Number(tableDano[i][j]));
                }
            }
        }
    }

    inputPlanAndPot();
    writePlan();
    potential();
    potentialWrite();
    checkPotential();
}

function print() {
    for (var i = 0; i < m; i++) {
        for (var j = 0; j < n; j++) {
            Table.values.push(plan[i][j]);
        }
    }
    var value = document.getElementsByClassName('value');
    for (var i = 0; i < Table.values.length; i++) {
        if (Table.values[i] !== 0) {
            value[i].value = Table.values[i];
        }
    }
}

btn.addEventListener('click', function () {
    for (var i = 0; i < document.getElementsByClassName('cost').length; i++) {
        if (document.getElementsByClassName('cost')[i].value == '' || isNaN(document.getElementsByClassName('cost')[i].value)) {
            document.getElementsByClassName('cost')[i].value = '';
            document.getElementsByClassName('cost')[i].placeholder = 'Не верно!';
            Table.cost[i + 1] = 'error';
        } else {
            Table.cost[i + 1] = +document.getElementsByClassName('cost')[i].value;
        }
    }
    for (var i = 0; i < document.getElementsByClassName('need').length; i++) {
        if (document.getElementsByClassName('need')[i].value == '' || isNaN(document.getElementsByClassName('need')[i].value)) {
            document.getElementsByClassName('need')[i].value = '';
            document.getElementsByClassName('need')[i].placeholder = 'Не верно!';
            Table.needs[i] = 'error';
        } else {
            Table.needs[i] = +document.getElementsByClassName('need')[i].value;
        }
    }
    for (var i = 0; i < document.getElementsByClassName('reserve').length; i++) {
        if (document.getElementsByClassName('reserve')[i].value == '' || isNaN(document.getElementsByClassName('reserve')[i].value)) {
            document.getElementsByClassName('reserve')[i].value = '';
            document.getElementsByClassName('reserve')[i].placeholder = 'Не верно!';
            Table.reserves[i] = 'error';
        } else {
            Table.reserves[i] = +document.getElementsByClassName('reserve')[i].value;
        }
    }

    tableDano = Input();

    if (checkInput() == false) {
        alert('Вы ввели неккоректные данные, попробуйте снова');
    } else if (checkSum() == false) {
        alert('Задача открытого типа, введите фиктивного поставщика или потребителя');
    } else {
        start();
    }

});

////////////////////////////////////////////////////////////////////////////////

var btnAddPost = document.getElementById('addPost'); //добавление столбца
btnAddPost.addEventListener('click', function () {
    n += 1;
    var th = document.createElement('th');
    th.textContent = 'Поставщик ' + String(n);
    var tr = document.getElementsByClassName('post')[0];
    tr.insertBefore(th, tr.lastElementChild);

    var tr = document.getElementsByTagName('tr');
    var tdClass = [];
    console.log(m);
    for (let i = 0; i < m; i++) {
        var td = document.createElement('td');
        var input1 = document.createElement('input');
        input1.type = 'text';
        input1.placeholder = 'Цена';
        input1.className = 'cost';

        var input2 = document.createElement('input');
        input2.type = 'text';
        input2.readOnly = true;
        input2.className = 'value';

        td.appendChild(input1);
        td.appendChild(input2);
        tdClass.push(td);

    }

    var td4 = document.createElement('td');
    var input7 = document.createElement('input');
    input7.type = 'text';
    input7.className = 'reserve';
    input7.placeholder = 'Кол-во';
    td4.appendChild(input7);
    tdClass.push(td4);

    if (n >= 3) {
        for (var i = 0; i < document.getElementsByClassName('name').length; i++) {
            document.getElementsByClassName('name')[i].value = 'Потреб. ' + String(i+1);
        }
    }

    for (var i = 0; i < document.getElementsByTagName('tr').length; i++) {
        tr[i+1].insertBefore(tdClass[i], tr[i+1].lastElementChild);
    }

});


var btnAddPotr = document.getElementById('addPotr'); //добавление строки
btnAddPotr.addEventListener('click', function () {
    m += 1;
    var tr = document.createElement('tr');
    var tdP = document.createElement('td');

    tdP.className = 'potr';
    var input = document.createElement('input');
    input.type = 'text';
    if (n >= 3) {
        input.value = 'Потреб. ' + String(m);    
    }
    else {
        input.value = 'Потребитель ' + String(m);
    }
    input.className = 'name';
    tdP.appendChild(input);

    var tdN = document.createElement('td');
    var inputN = document.createElement('input');
    inputN.type = 'text';
    inputN.placeholder = 'Кол-во';
    inputN.className = 'need';
    tdN.appendChild(inputN);

    tr.appendChild(tdP);
    for (let i = 0; i < n; i++) {
        var td = document.createElement('td');
        var input1 = document.createElement('input');
        input1.type = 'text';
        input1.placeholder = 'Цена';
        input1.className = 'cost';

        var input2 = document.createElement('input');
        input2.type = 'text';
        input2.readOnly = true;
        input2.className = 'value';

        td.appendChild(input1);
        td.appendChild(input2);

        tr.appendChild(td);
    }
    tr.appendChild(tdN);

    var t = document.querySelector('tbody');
    t.insertBefore(tr, t.lastElementChild);
});
