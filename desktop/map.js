//Begin map and map cell code
function GridCell(tower, isgoal, x, y) {
    if (tower)
        this.Tower = tower;
    if (isgoal) {
        this.DistanceFromGoal = 0;
        this.DirectDistanceFromGoal = 0;
    }
    else {
        this.DistanceFromGoal = 99999999;
        this.DirectDistanceFromGoal = 99999999;
    }
    if (x || x == 0) {
        this.x = x;
    }
    if (y || y == 0) {
        this.y = y;
    }
    this.Robot = [];
}
GridCell.prototype.getTower = function () {
    return this.Tower;
};
GridCell.prototype.getDistanceFromGoal = function () {
    return this.DistanceFromGoal;
};
GridCell.prototype.getDirectDistanceFromGoal = function () {
    return this.DirectDistanceFromGoal;
};
GridCell.prototype.setDistanceFromGoal = function (newdistance) {
    this.DistanceFromGoal = newdistance;
};
GridCell.prototype.setDirectDistanceFromGoal = function (newdistance) {
    this.DirectDistanceFromGoal = newdistance;
};
GridCell.prototype.setTower = function (tower) {
    this.Tower = tower;
};
GridCell.prototype.getRobot = function () {
    return this.Robot;
};
GridCell.prototype.setRobot = function (robots) {
    this.Robot = robots;
};
GridCell.prototype.addRobot = function (robot) {
    this.Robot.push(robot);
};
GridCell.prototype.removeRobot = function (robot) {
    var index = this.Robot.indexOf(robot);
    this.Robot = this.Robot.splice(0, index).concat(this.Robot.splice(index + 1, this.Robot.length));
};
GridCell.prototype.removeAllRobots = function () {
    this.Robot = [];
};
GridCell.prototype.isTowerPresent = function () {
    return !(this.Tower == undefined);
};
GridCell.prototype.isRobotPresent = function () {
    return this.Robot.length == 0;
};
GridCell.prototype.isgoal = function () {
    return (this.DistanceFromGoal == 0);
};
GridCell.prototype.makegoal = function () {
    this.DistanceFromGoal = 0;
    this.DirectDistanceFromGoal = 0;
};
function LogicalMap(goalx, goaly) {
    this.Map = new Array();
    for (var k = 0; k < this.MAP_WIDTH; k++) {
        this.Map[k] = [];
    }
    for (var i = 0; i < this.MAP_HEIGHT; i++) {
        for (var j = 0; j < this.MAP_WIDTH; j++) {
            this.Map[j][i] = new GridCell(null, 0, j, i);
        }
    }
    if ((goalx || goalx == 0) && (goaly || goaly == 0)) {
        this.Map[goalx][goaly].makegoal();
        this.updateDistancesFromGoal();
        this.updateDirectDistancesFromGoal();
    }
}
LogicalMap.prototype.MAP_HEIGHT = 9 ;
LogicalMap.prototype.MAP_WIDTH = 18;
LogicalMap.prototype.getMap = function () {
    return this.Map;
};
LogicalMap.prototype.setMap = function (map) {
    this.Map = map;
};
LogicalMap.prototype.getMAP_HEIGHT = function () {
    return this.MAP_HEIGHT;
};
LogicalMap.prototype.getMAP_WIDTH = function () {
    return this.MAP_WIDTH;
};
LogicalMap.prototype.setTowerUpdateDistances = function (x, y, tower) {
    this.Map[x][y].setTower(tower);
    this.updateDistancesFromGoal();
}
//input: the tower which the cell needs to be in range of
LogicalMap.prototype.getNearestToGoalCellContainingRobot = function (tower) {
    if (!tower || !tower.range) {
        //caller didn't provide a tower
        return null;
    }
    var qeue = [];
    var cell;
    //find the cell containing the given tower
    for (var i = 0; i < this.MAP_WIDTH; i++) {
        for (var j = 0; j < this.MAP_HEIGHT; j++) {
            if (this.Map[i][j].getTower() == tower) {
                cell = this.Map[i][j];
            }
        }
    }
    //qeue up every cell in range
    qeue = this.helper(cell, qeue, tower.range);
    //starting with the closest to the goal
    qeue.sort(function (a, b) {
        return a.getDistanceFromGoal() - b.getDistanceFromGoal()
    });
    //check the qeue for a cell containing a robot
    for (var m = 0; m < qeue.length; m++) {
        if (qeue[m].getRobot().length > 0) return qeue[m];
    }
    //no cells in range contain a robot
    return null;
};
LogicalMap.prototype.helper = function (cell, qeue, range) {
    qeue.push(cell);
    if (range <= 0) {
        return qeue;
    }
    if (cell.y - 1 >= 0) {
        if (qeue.indexOf(this.Map[cell.x][cell.y - 1]) == -1) {
            qeue = this.helper(this.Map[cell.x][cell.y - 1], qeue, range - 1);
        }
    }
    if (cell.y + 1 <= this.MAP_HEIGHT) {
        if (qeue.indexOf(this.Map[cell.x][cell.y + 1]) == -1) {
            qeue = this.helper(this.Map[cell.x][cell.y + 1], qeue, range - 1);
        }
    }
    if (cell.x - 1 >= 0) {
        if (qeue.indexOf(this.Map[cell.x - 1][cell.y]) == -1) {
            qeue = this.helper(this.Map[cell.x - 1][cell.y], qeue, range - 1);
        }
    }
    if (cell.x + 1 <= this.MAP_WIDTH) {
        if (qeue.indexOf(this.Map[cell.x + 1][cell.y]) == -1) {
            qeue = this.helper(this.Map[cell.x + 1][cell.y], qeue, range - 1);
        }
    }
    return qeue;
}
LogicalMap.prototype.updateDistancesFromGoal = function () {
for (var i = 0; i < this.MAP_WIDTH; i++) {
            for (var j = 0; j < this.MAP_HEIGHT; j++) {
			if(!this.Map[i][j].isgoal()) this.Map[i][j].DistanceFromGoal = 9999999999;
			}
			}
    var hasupdated = true;
    while (hasupdated) {
        hasupdated = false;
        for (var i = 0; i < this.MAP_WIDTH; i++) {
            for (var j = 0; j < this.MAP_HEIGHT; j++) {
                var currentlowest = this.Map[i][j].getDistanceFromGoal();
                var temp;
                if (i > 0) {
                    temp = this.Map[i - 1][j].getDistanceFromGoal();
                    if (temp < currentlowest) {
                        currentlowest = temp;
                    }
                }
                if (i < this.MAP_WIDTH - 1) {
                    temp = this.Map[i + 1][j].getDistanceFromGoal();
                    if (temp < currentlowest) {
                        currentlowest = temp;
                    }
                }
                if (j > 0) {
                    temp = this.Map[i][j - 1].getDistanceFromGoal();
                    if (temp < currentlowest) {
                        currentlowest = temp;
                    }
                }
                if (j < this.MAP_HEIGHT - 1) {
                    temp = this.Map[i][j + 1].getDistanceFromGoal();
                    if (temp < currentlowest) {
                        currentlowest = temp;
                    }
                }

                if (this.Map[i][j].isTowerPresent() && (currentlowest + this.Map[i][j].Tower.health) < this.Map[i][j].getDistanceFromGoal()) {
                    this.Map[i][j].DistanceFromGoal = currentlowest + this.Map[i][j].Tower.health;
                    hasupdated = true;
                }
                if ((!this.Map[i][j].isTowerPresent()) && ((currentlowest + 1) < this.Map[i][j].getDistanceFromGoal())) {
                    this.Map[i][j].setDistanceFromGoal(currentlowest + 1);
                    hasupdated = true;
					

                }

            }
        }
    }
    ;
//updateDirectDistancesFromGoal could probably be made much faster by implementing the logic in the flowchart, but should only need to run once per map creation so it's efficiency is a low priority
    LogicalMap.prototype.updateDirectDistancesFromGoal = function () {
        var hasupdated = true;
        while (hasupdated) {
            hasupdated = false;
            for (var i = 0; i < this.MAP_WIDTH; i++) {
                for (var j = 0; j < this.MAP_HEIGHT; j++) {
                    var currentlowest = this.Map[i][j].getDirectDistanceFromGoal();
                    var temp;
                    if (i > 0) {
                        temp = this.Map[i - 1][j].getDirectDistanceFromGoal();
                        if (temp < currentlowest) {
                            currentlowest = temp;
                        }
                    }
                    if (i < this.MAP_WIDTH - 1) {
                        temp = this.Map[i + 1][j].getDirectDistanceFromGoal();
                        if (temp < currentlowest) {
                            currentlowest = temp;
                        }
                    }
                    if (j > 0) {
                        temp = this.Map[i][j - 1].getDirectDistanceFromGoal();
                        if (temp < currentlowest) {
                            currentlowest = temp;
                        }
                    }
                    if (j < this.MAP_HEIGHT - 1) {
                        temp = this.Map[i][j + 1].getDirectDistanceFromGoal();
                        if (temp < currentlowest) {
                            currentlowest = temp;
                        }
                    }
                    if (((currentlowest + 1) < this.Map[i][j].getDirectDistanceFromGoal())) {
                        this.Map[i][j].setDirectDistanceFromGoal(currentlowest + 1);
                        hasupdated = true;

                    }

                }

            }
        }
    };
}
//End map and map cell code