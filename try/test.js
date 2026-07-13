const create = Object.create;
Object.create = function(pt) {
    console.log(pt);
    create(pt);
}
function Parent() {
	console.log(new.target);
	this.dataparent = "dataparent";
    console.log("parent new");
}
Parent.prototype.parentfunc=function() {
    console.log("parent func");
};
function Child() {
	this.datachild = "datachild";
    console.log("child new");
}
Object.setPrototypeOf(Child.prototype, Parent.prototype);
Reflect.construct(Parent, [], Child);