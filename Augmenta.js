/*

Augmenta protocol :

https://github.com/Theoriz/Augmenta/wiki

This code has been tested on Chataigne 1.5.0

*/
var newestPid = -1;
var newestAge = 0;

function oscEvent(address,args)
{
	if(newestPid == -1) { //init
		newestPid = args[0];
		newestAge = args[2];
	}

	if(args[0] == newestPid) {
		newestAge = args[2];
	}

	//script.log("received osc"+address);
	if(args[2] < newestAge) {//args[2] = age
		script.log("New : " + args[0]);
		newestAge = args[2];
		newestPid = args[0];
	}

	if(address=="/au/scene")
	{
		setAugmentaScene(local.values.scene, args);

	}else if (address=="/au/personUpdated")
	{
		if(args[1] == 0) //args[1] = oid
		{
			setAugmentaPerson(local.values.person0, args);
		} else if(args[1] == 1)
		{
			setAugmentaPerson(local.values.person1, args);
		} else if(args[1] == 2)
		{
			setAugmentaPerson(local.values.person2, args);
		} else if(args[1] == 3)
		{
			setAugmentaPerson(local.values.person3, args);
		} else if(args[1] == 4)
		{
			setAugmentaPerson(local.values.person4, args);
		}

		if(local.parameters.singlePersonMode.getData() == "newest")
		{
			if(args[0] == newestPid) {
				script.log("Update newest");
				setAugmentaPerson(local.values.singlePerson, args);
			}
		} else if(local.parameters.singlePersonMode.getData() == "oldest")
		{
			if(args[1] == 0) {
				setAugmentaPerson(local.values.singlePerson, args);
			}
		}
	}
}

function moduleParameterChanged(param)
{

	script.log("Parameter changed : "+param.name+" : "+param.get());
}

function setAugmentaPerson(person, args)
{

	person.pid.set(args[0]);
	person.oid.set(args[1]);
	person.age.set(args[2]);
	person.centroidX.set(args[3]);
	person.centroidY.set(args[4]);
	person.velocityX.set(args[5]);
	person.velocityY.set(args[6]);
	person.depth.set(args[7]);
	person.boundingRectX.set(args[8]);
	person.boundingRectY.set(args[9]);
	person.boundingRectWidth.set(args[10]);
	person.boundingRectHeight.set(args[11]);
	person.highestX.set(args[12]);
	person.highestY.set(args[13]);
	person.highestZ.set(args[14]);
}

function setAugmentaScene(scene, args)
{

	scene.currentTime.set(args[0]);
	scene.percentCovered.set(args[1]);
	scene.numPeople.set(args[2]);
	scene.averageMotionX.set(args[3]);
	scene.averageMotionY.set(args[4]);
	scene.width.set(args[5]);
	scene.height.set(args[6]);
	scene.depth.set(args[7]);
}
