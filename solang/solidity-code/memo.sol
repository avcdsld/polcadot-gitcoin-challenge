contract memo {
	string public str;

	constructor(string memory _str) public {
		str = _str;
	}

	function add(string memory _str) public {
		str = _str;
	}

	function get() public view returns (string memory) {
		return str;
	}
}