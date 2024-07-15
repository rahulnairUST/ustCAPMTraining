service MyService @(path: 'MyService') {

    function greetings(name:String(20)) returns String(40);
    function multiply(x:Integer,y:Integer) returns Integer;
}