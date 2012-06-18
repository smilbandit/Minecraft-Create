importPackage(Packages.java.io);
importPackage(Packages.com.sk89q.worldedit);
importPackage(Packages.com.sk89q.worldedit.blocks);

var getblock = {"begin":"end"};
setblock();
var sess = context.remember();

//Grab the block that the player has in focus and make that Z,0
var origin = player.getSolidBlockTrace(5);

//Get the direction the player is facing, for changing orintation of blocks
var dir = player.getCardinalDirection();
context.print(dir);

//Load up the specified mdl file in the models directory
var f = context.getSafeFile("models", argv[1] + '.mdl');
var data = FileReader(f);
var buffer = BufferedReader(data)
var line;

//Multipliers to be used to flip the mdl to different directions, default is North
dx = 1;
dy = 1;
dv = 0;
m = 0;
q = 0;

switch (dir) {
	case PlayerDirection.NORTH:
	case PlayerDirection.NORTH_EAST:
		dx = -1;
		dy = -1;
		dv = 0;
		m = 1;
		q = 1;
		break;
	case PlayerDirection.SOUTH:
	case PlayerDirection.SOUTH_WEST:
		dx = 1;
		dy = 1;
		dv = 0;
		m = -1;
		q = 2;
		break;
	case PlayerDirection.WEST:
	case PlayerDirection.NORTH_WEST:
		dx = 1;
		dy = -1;
		dv = 1;
		m = -1;
		q = 3;
		break;
	case PlayerDirection.EAST:
	case PlayerDirection.SOUTH_EAST:
		dx = -1;
		dy = 1;
		dv = 1;
		m = 1;
		q = 4;
		break;
}

	t = new Array();
	// t.push(new Array([blockid],[North modifier],[South modifier],[West modifier],[East modifier]));
	//Wooden Stairs Ascending
	t.push(new Array(53,0,1,3,2));
	t.push(new Array(53,1,0,2,3));
	t.push(new Array(53,2,3,0,1));
	t.push(new Array(53,3,2,1,0));
	t.push(new Array(53,4,5,7,6)); // upside down
	t.push(new Array(53,5,4,6,7)); // upside down
	t.push(new Array(53,6,7,4,5)); // upside down
	t.push(new Array(53,7,6,5,4)); // upside down
	//Cobblestone Stairs Ascending
	t.push(new Array(67,0,1,3,2));
	t.push(new Array(67,1,0,2,3));
	t.push(new Array(67,2,3,0,1));
	t.push(new Array(67,3,2,1,0));
	t.push(new Array(67,4,5,7,6)); // upside down
	t.push(new Array(67,5,4,6,7)); // upside down
	t.push(new Array(67,6,7,4,5)); // upside down
	t.push(new Array(67,7,6,5,4)); // upside down
	//Brick Stairs Ascending
	t.push(new Array(108,0,1,3,2));
	t.push(new Array(108,1,0,2,3));
	t.push(new Array(108,2,3,0,1));
	t.push(new Array(108,3,2,1,0));
	t.push(new Array(108,4,5,7,6)); // upside down
	t.push(new Array(108,5,4,6,7)); // upside down
	t.push(new Array(108,6,7,4,5)); // upside down
	t.push(new Array(108,7,6,5,4)); // upside down
	//Stone Brick Stairs Ascending
	t.push(new Array(109,0,1,3,2));
	t.push(new Array(109,1,0,2,3));
	t.push(new Array(109,2,3,0,1));
	t.push(new Array(109,3,2,1,0));
	t.push(new Array(109,4,5,7,6)); // upside down
	t.push(new Array(109,5,4,6,7)); // upside down
	t.push(new Array(109,6,7,4,5)); // upside down
	t.push(new Array(109,7,6,5,4)); // upside down
	//Nether Brick Stairs Ascending
	t.push(new Array(114,0,1,3,2));
	t.push(new Array(114,1,0,2,3));
	t.push(new Array(114,2,3,0,1));
	t.push(new Array(114,3,2,1,0));
	t.push(new Array(114,4,5,7,6)); // upside down
	t.push(new Array(114,5,4,6,7)); // upside down
	t.push(new Array(114,6,7,4,5)); // upside down
	t.push(new Array(114,7,6,5,4)); // upside down
	//Sandstone Stairs Ascending
	t.push(new Array(128,0,1,3,2));
	t.push(new Array(128,1,0,2,3));
	t.push(new Array(128,2,3,0,1));
	t.push(new Array(128,3,2,1,0));
	t.push(new Array(128,4,5,7,6)); // upside down
	t.push(new Array(128,5,4,6,7)); // upside down
	t.push(new Array(128,6,7,4,5)); // upside down
	t.push(new Array(128,7,6,5,4)); // upside down
	//Redstone Torch on
	t.push(new Array(75,1,2,4,3));
	t.push(new Array(75,2,1,3,4));
	t.push(new Array(75,3,4,1,2));
	t.push(new Array(75,4,3,2,1));
	//Redstone Torch off
	t.push(new Array(76,1,2,4,3));
	t.push(new Array(76,2,1,3,4));
	t.push(new Array(76,3,4,1,2));
	t.push(new Array(76,4,3,2,1));
	//Torch
	t.push(new Array(50,1,2,4,3));
	t.push(new Array(50,2,1,3,4));
	t.push(new Array(50,3,4,1,2));
	t.push(new Array(50,4,3,2,1));
	//Rail 
	t.push(new Array(66,0,0,1,1)); // East-West
	t.push(new Array(66,1,1,0,0)); // North-South
	t.push(new Array(66,2,3,4,5)); // Ascend South
	t.push(new Array(66,3,2,5,4)); // Ascend North
	t.push(new Array(66,4,5,3,2)); // Ascend East
	t.push(new Array(66,5,4,2,3)); // Ascend West
	t.push(new Array(66,6,8,9,7)); // Curve West-South
	t.push(new Array(66,7,9,6,8)); // Curve West-North
	t.push(new Array(66,8,6,7,9)); // Curve East-North
	t.push(new Array(66,9,7,8,6)); // Curve East-South
	//Power Rails
	t.push(new Array(27,0,0,1,1)); // East-West
	t.push(new Array(27,1,1,0,0)); // North-South
	t.push(new Array(27,2,3,4,5)); // Ascend South
	t.push(new Array(27,3,2,5,4)); // Ascend North
	t.push(new Array(27,4,5,3,2)); // Ascend East
	t.push(new Array(27,5,4,2,3)); // Ascend West
	//Detector Rails
	t.push(new Array(28,0,0,1,1)); // East-West
	t.push(new Array(28,1,1,0,0)); // North-South
	t.push(new Array(28,2,3,4,5)); // Ascend South
	t.push(new Array(28,3,2,5,4)); // Ascend North
	t.push(new Array(28,4,5,3,2)); // Ascend East
	t.push(new Array(28,5,4,2,3)); // Ascend West
	//Button
	t.push(new Array(77,1,2,4,3)); // North wall
	t.push(new Array(77,2,1,3,4)); // South wall
	t.push(new Array(77,3,4,1,2)); // East  wall
	t.push(new Array(77,4,3,2,1)); // West  wall
	//Levers
	t.push(new Array(69,1,2,4,3)); // Lever Off Wall  on North Wall
	t.push(new Array(69,2,1,3,4)); // Lever Off Wall  on South Wall
	t.push(new Array(69,3,4,1,2)); // Lever Off Wall  on East  Wall
	t.push(new Array(69,4,3,2,1)); // Lever Off Wall  on West  Wall
	t.push(new Array(69,5,5,6,6)); // Lever Off Floor pointing West
	t.push(new Array(69,6,6,5,5)); // Lever Off Floor pointing South
	//Redstone Repeater
	t.push(new Array(93,0,2,3,1));  // Redstone Repeater East  1 Tick
	t.push(new Array(93,1,3,0,2));  // Redstone Repeater South 1 Tick
	t.push(new Array(93,2,0,1,3));  // Redstone Repeater West  1 Tick
	t.push(new Array(93,3,1,2,0));  // Redstone Repeater North 1 Tick
	t.push(new Array(93,4,6,7,5));  // Redstone Repeater East  2 Tick
	t.push(new Array(93,5,7,4,6));  // Redstone Repeater South 2 Tick
	t.push(new Array(93,6,4,5,7));  // Redstone Repeater West  2 Tick
	t.push(new Array(93,7,5,6,4));  // Redstone Repeater North 2 Tick
	t.push(new Array(93,8,10,11,9)); // Redstone Repeater East  3 Tick
	t.push(new Array(93,9,11,8,10)); // Redstone Repeater South 3 Tick
	t.push(new Array(93,10,8,9,11)); // Redstone Repeater West  3 Tick
	t.push(new Array(93,11,9,10,8)); // Redstone Repeater North 3 Tick
	t.push(new Array(93,12,14,15,13)); // Redstone Repeater East  4 Tick
	t.push(new Array(93,13,15,12,14)); // Redstone Repeater South 4 Tick
	t.push(new Array(93,14,12,13,15)); // Redstone Repeater West  4 Tick
	t.push(new Array(93,15,13,14,12)); // Redstone Repeater North 4 Tick	
	//Sign Posts 
	//Don't use sign posts until I can figure out a way to put the text on them
	//Ladders
	t.push(new Array(65,2,3,4,5)); // North wall
	t.push(new Array(65,3,2,5,4)); // South wall
	t.push(new Array(65,4,5,3,2)); // East  wall
	t.push(new Array(65,5,4,2,3)); // West  wall
	//Wall Signs
	//Don't use wall signs until I can figure out a way to put the text on them
	//Furnaces
	t.push(new Array(61,2,3,4,5)); // North 
	t.push(new Array(61,3,2,5,4)); // South 
	t.push(new Array(61,4,5,3,2)); // East  
	t.push(new Array(61,5,4,2,3)); // West  
	//Dispensers
	t.push(new Array(23,2,3,4,5)); // North 
	t.push(new Array(23,3,2,5,4)); // South 
	t.push(new Array(23,4,5,3,2)); // East  
	t.push(new Array(23,5,4,2,3)); // West  
	//Chests 
	t.push(new Array(54,2,3,4,5)); // North 
	t.push(new Array(54,3,2,5,4)); // South 
	t.push(new Array(54,4,5,3,2)); // East  
	t.push(new Array(54,5,4,2,3)); // West  
	//Pumpkins
	t.push(new Array(86,0,2,3,1));  // South
	t.push(new Array(86,1,3,0,2));  // West
	t.push(new Array(86,2,0,1,3));  // North
	t.push(new Array(86,3,1,2,0));  // East
	//Jack-O-Lanterns 
	t.push(new Array(91,0,2,3,1));  // South
	t.push(new Array(91,1,3,0,2));  // West
	t.push(new Array(91,2,0,1,3));  // North
	t.push(new Array(91,3,1,2,0));  // East
	//Trapdoors
	t.push(new Array(96,0,1,2,3));  // South
	t.push(new Array(96,1,0,3,2));  // West
	t.push(new Array(96,2,3,1,0));  // North
	t.push(new Array(96,3,2,0,1));  // East
	//pistons, 
	t.push(new Array(33,2,3,4,5));  // South
	t.push(new Array(33,3,2,5,4));  // West
	t.push(new Array(33,4,5,3,2));  // North
	t.push(new Array(33,5,4,2,3));  // East
	//sticky pistons
	t.push(new Array(29,2,3,4,5));  // South
	t.push(new Array(29,3,2,5,4));  // West
	t.push(new Array(29,4,5,3,2));  // North
	t.push(new Array(29,5,4,2,3));  // East
	//vines
	t.push(new Array(106,8,2,4,1));  // South
	t.push(new Array(106,1,4,8,2));  // West
	t.push(new Array(106,2,8,1,4));  // North
	t.push(new Array(106,4,1,2,8));  // East
	//brewing stand
	//just use 0
	//beds
	t.push(new Array(26,1,3,4,2));  // position B east footer 
	t.push(new Array(26,2,4,1,3));  // position D east footer
	t.push(new Array(26,3,1,2,4));  // position C east footer
	t.push(new Array(26,4,2,3,1));  // position A east footer
	t.push(new Array(26,8,10,11,9));  // position A east pillow
	t.push(new Array(26,9,11,8,10));  // position B east pillow 
	t.push(new Array(26,10,8,9,11));  // position D east pillow 
	t.push(new Array(26,11,9,10,8));  // position C east pillow
	//doors
	t.push(new Array(64,0,2,3,1));  // face North open East
	t.push(new Array(64,1,3,0,2));  // face East  open South
	t.push(new Array(64,2,0,1,3));  // face South open West  
	t.push(new Array(64,3,1,2,0));  // face West  open North
	t.push(new Array(64,4,6,7,5));  // face East  open North  
	t.push(new Array(64,5,7,4,6));  // face South open East  
	t.push(new Array(64,6,4,5,7));  // face West  open South 
	t.push(new Array(64,7,5,6,4));  // face North open West  
	t.push(new Array(64,8,12,14,10));  // top open East
	t.push(new Array(64,10,8,12,14));  // top open South
	t.push(new Array(64,12,14,10,8));  // top open West
	t.push(new Array(64,14,10,8,12));  // top open North
	
	
while (line = buffer.readLine()) {
	line = line.replaceAll("\/\/.*","");
	//context.print(line);
	s = line.split(',')

	if (s[0]=='C') {
	}
	if (s[0]=='E') {
		// emit string, don't use comma's
		context.print(s[1]);
	}
	if (s[0]=='B') {
		//Set up a block to be used in the layout
		d = s[3];
		b = s[2];

		// This goes through each block as it's assigned and changes the direction if the user isn't pointing north.
		if (dir != 'NORTH') {
			for (var x = 0; x < t.length; x++){
				if (s[2] == t[x][0] && s[3] == t[x][1]) { 
					//context.print(t[x][2]+','+t[x][3]+','+t[x][4]);
					if (dir=='SOUTH') { d = t[x][2]; } 
					if (dir=='WEST') { d = t[x][3]; } 
					if (dir=='EAST') { d = t[x][4]; } 
				}
			}
		}
		
		getblock[s[1]] = new BaseBlock(s[2],d);
	}
	if (s[0]=='I') {
		//Gives player an item
		//I,45,20  gives player 20 bricks
		player.giveItem(s[1],s[2]);
	}
	if (s[0]=='Z') {
		//Single level of block layout
		z = s[1];
		//context.print(z);
		x_max = s[2];
		y_max = s[3];
		if (dv==0){
			for (var x = x_max; x > 0; x--){
				line = buffer.readLine();
				for (var y = 0; y < y_max; y++){
					g = y;
					id = line.substr(g,1);
					//context.print(x + " - " + z + " - " + y + " - " + id);
					sess.setBlock(origin.add(x*dx+m, z, y*dy), getblock[id]);
				}
			}
		} else {
			for (var x = x_max; x > 0; x--){
				line = buffer.readLine();
				for (var y = 0; y < y_max; y++){
					g = y
					id = line.substr(g,1);
					//context.print(x + " - " + z + " - " + y + " - " + g);
					//context.print(id);
					if (id != 'N') {
						sess.setBlock(origin.add(y*dy, z, x*dx+m), getblock[id]);
					}
				}
			}
		}
	}
}

function setblock(){
	//set up default blocks, Feel free to add more but any that require direction should be in the mdl file.
	//All block codes can be overwritten except N, N must be null
	getblock['N'] = null;  // Doesn't set a block, leave whats there, there
	getblock['0'] = context.getBlock("air");
	getblock['1'] = context.getBlock("stone");
	getblock['2'] = context.getBlock("dirt");
	getblock['3'] = context.getBlock("water");
	getblock['4'] = context.getBlock(17); // Wood
	getblock['5'] = context.getBlock("cobblestone");
	getblock['6'] = context.getBlock("gravel");
	getblock['7'] = context.getBlock(98); // Stone Bricks
	getblock['8'] = context.getBlock("glass");
	getblock['9'] = context.getBlock(5); // Wooden Planks
	getblock['f'] = context.getBlock("fence");
	getblock['w'] = context.getBlock("cloth");
	getblock['G'] = context.getBlock("glowstone");

}

