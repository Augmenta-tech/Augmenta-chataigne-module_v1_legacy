/*

Augmenta protocol :

https://github.com/Theoriz/Augmenta/wiki

This code has been tested on Chataigne 1.5.0

*/

var newestPid = -1;
var newestAge = 0;

function oscEvent(address,args)
{

	if(address=="/au/scene")
	{
		setAugmentaScene(local.values.scene, args);

	}else if (address=="/au/personUpdated")
	{
		if(args[1] == 0) //args[1] = oid
		{
			setAugmentaPerson(local.values.person0, args);

			// Oldest is always oid = 0 if algo is correctly implemented
			if(local.parameters.singlePersonMode.getData() == "oldest")
			{
				setAugmentaPerson(local.values.singlePerson, args);	
			}
			
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

		// Check and udate newest
		if(local.parameters.singlePersonMode.getData() == "newest")
		{
			updateNewest(args);
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

function updateNewest(args)
{
	var pid = arg[0];
	var age = arg[1];

	// Check if newest
	if(newestPid == -1) { //init
		newestPid = pid;
		newestAge = age;
	}
	else if(newestPid == pid) {
		newestAge = age;
	}

	if(age < newestAge) {//args[2] = age
		script.log("New newest person : " + pid);
		newestAge = age;
		newestPid = pid;
		setAugmentaPerson(local.values.singlePerson, args);
	}
}
