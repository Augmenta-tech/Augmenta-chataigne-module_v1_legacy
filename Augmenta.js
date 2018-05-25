/* 

Augmenta protocol :

https://github.com/Theoriz/Augmenta/wiki

This code has been tested on Chataigne 1.4.0b

*/

var p0 = local.values.personWithOid0;
var scene = local.values.scene;

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

	p0.pid.set(pid);
	p0.oid.set(oid);
	p0.age.set(age);
	p0.centroidX.set(centroidX);
	p0.centroidY.set(centroidY);
	p0.velocityX.set(velocityX);
	p0.velocityY.set(velocityY);
	p0.depth.set(depth);
	p0.boundingRectX.set(boundingRectX);
	p0.boundingRectY.set(boundingRectY);
	p0.boundingRectWidth.set(boundingRectWidth);
	p0.boundingRectHeight.set(boundingRectHeight);
	p0.highestX.set(highestX);
	p0.highestY.set(highestY);
	p0.highestZ.set(highestZ);
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
