#include <stdio.h>
#include <stdlib.h>
#include <time.h>

// Random dice roller

int roll_die(void) {
    return rand() % 6 + 1;
}

int main(void) {
    srand((unsigned int) time(NULL));

    printf("Random Dice Roller\n");
    printf("==================\n\n");

    for (int i = 1; i <= 10; ++i) {
        int a = roll_die();
        int b = roll_die();
        printf("Roll %2d: %d + %d = %d\n", i, a, b, a + b);
    }

    printf("\nGood luck!\n");
    return 0;
}


