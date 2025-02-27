// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol"; // Import ERC-20 interface

contract SubscriptionPlatform is Ownable, ReentrancyGuard {
    enum Tier {
        STANDARD,
        PREMIUM,
        VIP
    } // 3 Subscription Tiers

    struct Creator {
        bool exists;
        uint256[3] tierPrices; // Prices for Standard, Premium, VIP
    }

    struct Subscription {
        address creator;
        Tier tier;
        uint256 expiry;
    }

    mapping(address => Creator) public creators;
    mapping(address => Subscription[]) public userSubscriptions; // Array of subscriptions per user
    mapping(address => uint256) public balances; // Creators' and owner's earnings

    IERC20 public token; // ERC-20 token contract

    event SubscriptionPurchased(
        address indexed user,
        address indexed creator,
        Tier tier,
        uint256 price,
        uint256 expiry
    );
    event SubscriptionTiersUpdated(
        address indexed creator,
        uint256[3] tierPrices
    );
    event FundsWithdrawn(address indexed recipient, uint256 amount);

    constructor(address _tokenAddress) Ownable(msg.sender) {
        token = IERC20(_tokenAddress); // Initialize the token contract
    }

    // ============ CREATOR FUNCTIONS ============

    function setSubscriptionTiers(uint256[3] memory _tierPrices) external {
        require(
            _tierPrices[0] > 0 && _tierPrices[1] > 0 && _tierPrices[2] > 0,
            "All tier prices must be greater than 0"
        );
        require(!creators[msg.sender].exists, "Creator already exists");

        creators[msg.sender] = Creator({exists: true, tierPrices: _tierPrices});

        emit SubscriptionTiersUpdated(msg.sender, _tierPrices);
    }

    function withdrawFunds() external nonReentrant {
        uint256 amount = balances[msg.sender];
        require(amount > 0, "No funds available");

        balances[msg.sender] = 0;

        // Transfer tokens to the creator
        bool success = token.transfer(msg.sender, amount);
        require(success, "Transfer failed");

        emit FundsWithdrawn(msg.sender, amount);
    }

    // ============ USER FUNCTIONS ============

    function subscribe(address _creator, uint256 _tier) external {
        require(_tier < 3, "Invalid tier"); // Ensure _tier is 0, 1, or 2

        Creator storage creator = creators[_creator];
        require(creator.exists, "Creator does not exist");

        uint256 price = creator.tierPrices[_tier];
        require(price > 0, "Invalid tier price");

        // Transfer tokens from the user to this contract
        bool success = token.transferFrom(msg.sender, address(this), price);
        require(success, "Transfer failed");

        // Calculate 2% fee for the company
        uint256 fee = (price * 2) / 100; // 2% of the price
        uint256 creatorShare = price - fee; // Remaining 98% for the creator

        // Update owner's balance with the fee
        balances[owner()] += fee;

        // Update creator's balance with their share
        balances[_creator] += creatorShare;

        // Add new subscription to the user's subscription array
        userSubscriptions[msg.sender].push(
            Subscription({
                creator: _creator,
                tier: Tier(_tier),
                expiry: block.timestamp + 30 days
            })
        );

        emit SubscriptionPurchased(
            msg.sender,
            _creator,
            Tier(_tier),
            price,
            block.timestamp + 30 days
        );
    }

    // Helper function to get all subscriptions for a user
    function getUserSubscriptions(
        address _user
    ) external view returns (Subscription[] memory) {
        return userSubscriptions[_user];
    }

    // Helper function to check if a user is subscribed to a specific creator
    function isSubscribedToCreator(
        address _user,
        address _creator
    ) external view returns (bool) {
        Subscription[] memory subscriptions = userSubscriptions[_user];
        for (uint256 i = 0; i < subscriptions.length; i++) {
            if (
                subscriptions[i].creator == _creator &&
                subscriptions[i].expiry >= block.timestamp
            ) {
                return true;
            }
        }
        return false;
    }

    // ============ OWNER FUNCTIONS ============

    function withdrawOwnerFunds() external onlyOwner nonReentrant {
        uint256 amount = balances[owner()];
        require(amount > 0, "No funds available");

        balances[owner()] = 0;

        // Transfer tokens to the owner
        bool success = token.transfer(owner(), amount);
        require(success, "Transfer failed");

        emit FundsWithdrawn(owner(), amount);
    }

    // ============ HELPER FUNCTIONS ============

    function contentCreatorData()
        external
        view
        returns (uint256[3] memory, uint256)
    {
        Creator storage creator = creators[msg.sender];
        require(creator.exists, "Creator does not exist");

        // Return tier prices and balance
        return (creator.tierPrices, balances[msg.sender]);
    }
}
