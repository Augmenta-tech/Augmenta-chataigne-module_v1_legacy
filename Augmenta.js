/* 

Augmenta protocol :

https://github.com/Theoriz/Augmenta/wiki

This code has been tested on Chataigne 1.4.0b

*/

var scene = local.values.scene;

function oscEvent(address,args)
{
	//script.log("received osc"+address);

	if(address=="/au/scene")
	{
		setAugmentaScene(args[0], args[1], args[2], args[3], args[4], args[5], args[6], args[7]);

	}else if (address=="/au/personUpdated") // parse only persons with oid = 0
	{
		if(args[1] == 0)
		{
			setAugmentaPerson(local.values.person0, args[0], args[1], args[2], args[3], args[4], args[5], args[6], args[7],
						  args[8], args[9], args[10], args[11], args[12], args[13], args[14]);
		} else if(args[1] == 1)
		{
			setAugmentaPerson(local.values.person1, args[0], args[1], args[2], args[3], args[4], args[5], args[6], args[7],
						  args[8], args[9], args[10], args[11], args[12], args[13], args[14]);
		} else if(args[1] == 2)
		{
			setAugmentaPerson(local.values.person2, args[0], args[1], args[2], args[3], args[4], args[5], args[6], args[7],
						  args[8], args[9], args[10], args[11], args[12], args[13], args[14]);
		} else if(args[1] == 3)
		{
			setAugmentaPerson(local.values.person3, args[0], args[1], args[2], args[3], args[4], args[5], args[6], args[7],
						  args[8], args[9], args[10], args[11], args[12], args[13], args[14]);
		} else if(args[1] == 4)
		{
			setAugmentaPerson(local.values.person4, args[0], args[1], args[2], args[3], args[4], args[5], args[6], args[7],
						  args[8], args[9], args[10], args[11], args[12], args[13], args[14]);
		}
	}

	// TODO

	// Fill Newest, Oldest
}

function moduleParameterChanged(param)
{

	script.log("Parameter changed : "+param.name+" : "+param.get());

}

function setAugmentaPerson(person,
						   pid,
						   oid,
						   age,
						   centroidX,
						   centroidY,
						   velocityX,
						   velocityY,
						   depth,
						   boundingRectX,
						   boundingRectY,
						   boundingRectWidth,
						   boundingRectHeight,
						   highestX,
						   highestY,
						   highestZ)
{

	person.pid.set(pid);
	person.oid.set(oid);
	person.age.set(age);
	person.centroidX.set(centroidX);
	person.centroidY.set(centroidY);
	person.velocityX.set(velocityX);
	person.velocityY.set(velocityY);
	person.depth.set(depth);
	person.boundingRectX.set(boundingRectX);
	person.boundingRectY.set(boundingRectY);
	person.boundingRectWidth.set(boundingRectWidth);
	person.boundingRectHeight.set(boundingRectHeight);
	person.highestX.set(highestX);
	person.highestY.set(highestY);
	person.highestZ.set(highestZ);
}

function setAugmentaScene(currentTime,
						  percentCovered,
						  numPeople,
						  averageMotionX,
						  averageMotionY,
						  width,
						  height,
						  depth)
{

	scene.currentTime.set(currentTime);
	scene.percentCovered.set(percentCovered);
	scene.numPeople.set(numPeople);
	scene.averageMotionX.set(averageMotionX);
	scene.averageMotionY.set(averageMotionY);
	scene.width.set(width);
	scene.height.set(height);
	scene.depth.set(depth);
}
