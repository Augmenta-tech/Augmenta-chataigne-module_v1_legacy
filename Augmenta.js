/*

Augmenta protocol :

https://github.com/Theoriz/Augmenta/wiki

This code has been tested on Chataigne 1.6.0

*/

var numPeople = 0;

function init()
{
	local.parameters.pass_through.setCollapsed(true);
	local.values.singlePerson.setCollapsed(true);
}

function moduleParameterChanged(param)
{
	if(param.is(local.parameters.singlePersonMode)) {

		if(local.parameters.singlePersonMode.getData() == "none")
		{
				script.log("foonone");

			local.values.singlePerson.setCollapsed(true);
			local.values.person0.setCollapsed(false);
			local.values.person1.setCollapsed(false);
			local.values.person2.setCollapsed(false);
			local.values.person3.setCollapsed(false);
			local.values.person4.setCollapsed(false);
		} else {

							script.log("foo");

			local.values.singlePerson.setCollapsed(false);
			local.values.person0.setCollapsed(true);
			local.values.person1.setCollapsed(true);
			local.values.person2.setCollapsed(true);
			local.values.person3.setCollapsed(true);
			local.values.person4.setCollapsed(true);
		}
	}
}

function oscEvent(address,args)
{

	if(address == "/au/scene")
	{
		setAugmentaScene(local.values.scene, args);

	} else if(address == "/au/personUpdated" || address == "/au/personEntered")
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

	} else if(address == "/au/personWillLeave")
	{
		if(args[1] == 0) //args[1] = oid
		{
			resetAugmentaPerson(local.values.person0, args);

			// Oldest is always oid = 0 if algo is correctly implemented
			if(local.parameters.singlePersonMode.getData() == "oldest")
			{
				resetAugmentaPerson(local.values.singlePerson, args);	
			}
			
		} else if(args[1] == 1)
		{
			resetAugmentaPerson(local.values.person1, args);
		} else if(args[1] == 2)
		{
			resetAugmentaPerson(local.values.person2, args);
		} else if(args[1] == 3)
		{
			resetAugmentaPerson(local.values.person3, args);
		} else if(args[1] == 4)
		{
			resetAugmentaPerson(local.values.person4, args);
		}

		// Check and update newest
		if(local.parameters.singlePersonMode.getData() == "newest")
		{
			resetNewest(args);
		}
	}
}

function setAugmentaPerson(person, args)
{
	person.hasData.set(true);
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

function resetAugmentaPerson(person)
{
	person.hasData.set(false);
	/*person.pid.set(-1);
	person.oid.set(-1);
	person.age.set(0);
	person.centroidX.set(0);
	person.centroidY.set(0);
	person.velocityX.set(0);
	person.velocityY.set(0);
	person.depth.set(0);
	person.boundingRectX.set(0);
	person.boundingRectY.set(0);
	person.boundingRectWidth.set(0);
	person.boundingRectHeight.set(0);
	person.highestX.set(0);
	person.highestY.set(0);
	person.highestZ.set(0);*/
}

function setAugmentaScene(scene, args)
{
	scene.currentTime.set(args[0]);
	scene.percentCovered.set(args[1]);
	scene.numPeople.set(args[2]);
	numPeople = args[2];
	scene.averageMotionX.set(args[3]);
	scene.averageMotionY.set(args[4]);
	scene.width.set(args[5]);
	scene.height.set(args[6]);
	scene.depth.set(args[7]);
}

function updateNewest(args)
{

	//script.log("num people : " + scene.numPeople);

	if(args[1] == (numPeople - 1)) // args[1] is oid
	{
		setAugmentaPerson(local.values.singlePerson, args);	
	}
}

function resetNewest(args)
{
	if(args[1] == (numPeople - 1)) // args[1] is oid
	{
		resetAugmentaPerson(local.values.singlePerson, args);	
	}	
}
