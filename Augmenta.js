
/* 

Augmenta protocol :

https://github.com/Theoriz/Augmenta/wiki

This code has been tested on Chataigne 1.4.0b

*/

function oscEvent(address,args)
{
	//script.log("received osc"+address);

	if(address=="/au/scene")
	{
		setAugmentaScene(args[0], args[1], args[2], args[3], args[4], args[5], args[6], args[7]);

	}else if (address=="/au/personUpdated" && args[1] == 0) // parse only persons with oid = 0
	{
		setAugmentaPerson(args[0], args[1], args[2], args[3], args[4], args[5], args[6], args[7],
						  args[8], args[9], args[10], args[11], args[12], args[13], args[14]);
	}
}

function moduleParameterChanged(param)
{

	script.log("Parameter changed : "+param.name+" : "+param.get());

}

function setAugmentaPerson(pid,
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

	local.values.pid.set(pid);
	local.values.oid.set(oid);
	local.values.age.set(age);
	local.values.centroidX.set(centroidX);
	local.values.centroidY.set(centroidY);
	local.values.velocityX.set(velocityX);
	local.values.velocityY.set(velocityY);
	local.values.depth.set(depth);
	local.values.boundingRectX.set(boundingRectX);
	local.values.boundingRectY.set(boundingRectY);
	local.values.boundingRectWidth.set(boundingRectWidth);
	local.values.boundingRectHeight.set(boundingRectHeight);
	local.values.highestX.set(highestX);
	local.values.highestY.set(highestY);
	local.values.highestZ.set(highestZ);
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

	local.values.currentTime.set(currentTime);
	local.values.percentCovered.set(percentCovered);
	local.values.numPeople.set(numPeople);
	local.values.averageMotionX.set(averageMotionX);
	local.values.averageMotionY.set(averageMotionY);
	local.values.width.set(width);
	local.values.height.set(height);
	local.values.sceneDepth.set(depth);
}
