# SmartRockets
Applies a genetic algorithm for path finding rockets.
These smart rockets find their way around user made obstacles (click and drag) using a genetic algorithm that selects the most fit agents in the population and produces a new population from them. Algorithm includes mutation for better performance and global convergence.
Heavily based on The Coding Train's [Genetic Algorithms series](https://www.youtube.com/playlist?list=PLRqwX-V7Uu6bJM3VgzjNV5YxVxUwzALHV) (great series, check it out!).

## How to run
To play directly, visit the project on my website [here](https://www.pforderique.com/project/623b9bbafeeef100231eccb1)

## How it works

### Initialization
The algorithm starts by creating an initial population with randomized DNA/genes. In this case, the genes encode movement vectors that the rocket takes throughout its lifespan.
A _fitness function_ needs to be defined as well, incorporating metrics important to calculate succcess (sort of like a loss function).
For example, the Smart Rockets use information like distance to target, whether or not the rocket crashed or succeeded, and time to decide how "fit" a rocket is.
Also decide on a _mating process_ that takes in some number of "parents" and produces a new offspring based on the genes of those parents.
Finally, decide on a _mutation rate_, how often new rockets can mutate, and how that mutation will occur.

### Simulation
1. After each run, the fitness of every rocket is evaluated using the fitness function and scaled down by the maximum rocket fitness in the population
2. Based on the relative fitness scores (0 - 1), create a "mating pool" where more fit rockets appear more often.
3. Create a new population by using the mating algorithm decided on (here, two parents are selected, and the offspring receives some p% of genes from parent1, and the other 100-p% from parent2)
4. Each new rocket gets mutated based on the mutation rate percentage to increase variety in the new population
5. Let the cycle run for these new rockets
