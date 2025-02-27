// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

interface IERC20 {
    // Returns the total supply of tokens
    function totalSupply() external view returns (uint256);

    // Returns the balance of tokens for a given account
    function balanceOf(address account) external view returns (uint256);

    // Transfers tokens from the caller to a recipient
    function transfer(
        address recipient,
        uint256 amount
    ) external returns (bool);

    // Returns the remaining number of tokens that `spender` is allowed to spend on behalf of `owner`
    function allowance(
        address owner,
        address spender
    ) external view returns (uint256);

    // Approves `spender` to spend up to `amount` tokens on behalf of the caller
    function approve(address spender, uint256 amount) external returns (bool);

    // Transfers tokens from `sender` to `recipient` using the allowance mechanism
    function transferFrom(
        address sender,
        address recipient,
        uint256 amount
    ) external returns (bool);

    // Emitted when tokens are transferred from one account to another
    event Transfer(address indexed from, address indexed to, uint256 value);

    // Emitted when an allowance is set by a call to `approve`
    event Approval(
        address indexed owner,
        address indexed spender,
        uint256 value
    );
}
