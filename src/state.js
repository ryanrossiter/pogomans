const State = {
	caught: 0,
    lastTargetPos: null,

	reset: function() {
		this.caught = 0;
        this.lastTargetPos = null;
	}
}

export default State;