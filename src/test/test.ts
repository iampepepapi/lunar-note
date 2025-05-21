// LEVEL 1: TWO SUM (EASY)

function twoSum(nums: number[], target: number): number[] {
    for (let a = 0; a < nums.length; a++) {
        for (let b = a + 1; b < nums.length; b++) {
            if (nums[a] + nums[b] == target) {
                return [a, b]
            }
        }
    }
    return [];
}

// console.log(twoSum([2, 7, 11, 15], 9))

function twoMultiples(nums: number[], target: number): number[] {

    for (let a = 0; a < nums.length; a++) { // checks the first value in the array
        for (let b = a + 1; b < nums.length; b++) { // checks the second value in the array
            if (nums[a] * nums[b] == target) { // if the first value multiplied by the second value equals the target, return the indexes of the two values
                return [a, b]
            }
        }
    }
    return []
}

// console.log(twoMultiples([2, 7, 11, 15], 105));

// LEVEL 2: ADD TWO NUMBERS (MEDIUM)

class ListNode {
    val: number
    next: ListNode | null
    constructor(val?: number, next?: ListNode | null) {
        this.val = (val === undefined ? 0 : val)
        this.next = (next === undefined ? null : next)
    }
}

function addTwoNumbers(l1: ListNode | null, l2: ListNode | null): ListNode | null {
    const dummyHead = new ListNode(0);
    // console.log(dummyHead)
    let current = dummyHead;
    let carry = 0;

    while (l1 !== null || l2 !== null) {
        const x = l1 ? l1.val : 0;
        const y = l2 ? l2.val : 0;

        const sum = x + y + carry;
        carry = Math.floor(sum / 10);

        current.next = new ListNode(sum % 10);
        current = current.next;

        if (l1) l1 = l1.next;
        if (l2) l2 = l2.next;
    }

    if (carry > 0) {
        current.next = new ListNode(carry);
    }

    return dummyHead.next;
}


console.log(addTwoNumbers(new ListNode(2, new ListNode(4, new ListNode(3))), new ListNode(5, new ListNode(6, new ListNode(4)))));