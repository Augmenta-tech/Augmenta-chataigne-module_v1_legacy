/*

Augmenta protocol :

https://github.com/Theoriz/Augmenta/wiki

This code has been tested on Chataigne 1.6.0

*/

// The module currently display 5 objects maximum declared in module.json
var maxPersonDisplayed = 5;

function init()
{
	local.parameters.pass_through.setCollapsed(true);
	local.values.singlePerson.setCollapsed(true);
	local.scripts.setCollapsed(true);

	for(var i = 0 ; i < maxPersonDisplayed ; i++)
	{	
		local.values.getChild("Person" + i).setCollapsed(true);
	}
}

function moduleParameterChanged(param)
{
	if(param.is(local.parameters.singlePersonMode)) {

		if(local.parameters.singlePersonMode.get() == "none")
		{
			// Clean and fold single person object
			local.values.singlePerson.setCollapsed(true);
			resetAugmentaPerson(local.values.singlePerson, args);

		} else {
			// Unfold single person object panel
			local.values.singlePerson.setCollapsed(false);
		}
	}
}

function oscEvent(address,args)
{

	if(address == "/au/scene")
	{
		setAugmentaScene(local.values.scene, args);

	} else if(address == "/au/personUpdated")
	{

		// Update objects
		for(var i = 0 ; i < maxPersonDisplayed ; i++)
		{
			 if(args[1] == i) //args[1] = oid
			 {
 				setAugmentaPerson(local.values.getChild("Person" + i), args);
			 }
		}

		// Update Oldest and newest
		// Oldest is always oid = 0 if algo is correctly implemented
		if(local.parameters.singlePersonMode.get() == "oldest" && args[1] == 0)
		{
			setAugmentaPerson(local.values.singlePerson, args);

		} else if(local.parameters.singlePersonMode.get() == "newest" && args[1] == getNewestId())
		{

			setAugmentaPerson(local.values.singlePerson, args);

		}

	} else if(address == "/au/personEntered")
	{
		// Update objects
		for(var i = 0 ; i < maxPersonDisplayed ; i++)
		{
			 if(args[1] == i) //args[1] = oid
			 {
 				local.values.getChild("Person" + i).setCollapsed(false);
 				setAugmentaPerson(local.values.getChild("Person" + i), args);
			 }
		}

		// Update Oldest and newest
		// Oldest is always oid = 0 if algo is correctly implemented
		if(local.parameters.singlePersonMode.get() == "oldest" && args[1] == 0)
		{
			setAugmentaPerson(local.values.singlePerson, args);

		} else if(local.parameters.singlePersonMode.get() == "newest" && args[1] == getNewestId())
		{
			setAugmentaPerson(local.values.singlePerson, args);
		}

	} else if(address == "/au/personWillLeave")
	{
		
		for(var i = 0 ; i < maxPersonDisplayed ; i++)
		{
			 if(args[1] == i) //args[1] = oid
			 {
 				local.values.getChild("Person" + i).setCollapsed(true);
 				resetAugmentaPerson(local.values.getChild("Person" + i), args);
			 }
		}

		// Reset Oldest and newest
		// Oldest is always oid = 0 if algo is correctly implemented
		if(local.parameters.singlePersonMode.get() == "oldest" && args[1] == 0)
		{
			resetAugmentaPerson(local.values.singlePerson);

		} else if(local.parameters.singlePersonMode.get() == "newest" && args[1] == getNewestId())
		{
			resetAugmentaPerson(local.values.singlePerson);
		}
	}
}

function setAugmentaPerson(person, args)
{
	person.hasData.set(true);
	person.pid.set(args[0]);
	person.oid.set(args[1]);
	person.age.set(args[2]);
	person.centroid.set(args[3],args[4]);
	person.velocity.set(args[5],args[6]);
	person.depth.set(args[7]);
	person.boundingRectCoord.set(args[8],args[9]);
	person.boundingRectWidth.set(args[10]);
	person.boundingRectHeight.set(args[11]);
	person.highestPoint.set(args[12],args[13],args[14]);
}

function resetAugmentaPerson(person)
{
	person.hasData.set(false);
	person.pid.set(0);
	person.oid.set(0);
	person.age.set(0);
	person.centroid.set(0,0);
	person.velocity.set(0,0);
	person.depth.set(0);
	person.boundingRectCoord.set(0,0);
	person.boundingRectWidth.set(0);
	person.boundingRectHeight.set(0);
	person.highestPoint.set(0,0,0);
}

function setAugmentaScene(scene, args)
{
	scene.currentTime.set(args[0]);
	scene.percentCovered.set(args[1]);
	scene.numPeople.set(args[2]);
	scene.averageMotion.set(args[3],args[4]);
	scene.width.set(args[5]);
	scene.height.set(args[6]);
	scene.depth.set(args[7]);
}

function getNewestId(args)
{
	if(local.values.scene.numPeople.get() > 0)
	{
		// Newest is last id of the scene so newest oid is objectCount-1
		return local.values.scene.numPeople.get() - 1;

	} else
	{
		// no object in the scene
		return -1;
	}
}
