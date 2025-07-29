# Uncertainty Visualised: 95% Confidence Intervals

**Visualization Feature:** Error bars showing 95% confidence intervals  
**Statistical Level:** 95% confidence  
**Purpose:** Communicate sampling variability  
**Interpretation:** Statistical significance assessment  

---

## What Are Confidence Intervals?

### **Definition:**
A **confidence interval** is a range of values that is likely to contain the true population parameter with a specified level of confidence (in this case, 95%).

### **In This Visualization:**
- **Error bars** extend above and below each data point
- **95% confidence** means we're 95% confident the true value lies within the interval
- **Sampling variability** is made explicit to viewers
- **Statistical significance** can be assessed by overlap

---

## Understanding 95% Confidence Intervals

### **What 95% Means:**
- If we repeated the survey **100 times**, the true value would fall within the confidence interval in **95 out of 100** cases
- **5% of the time**, the true value would fall outside the interval
- This reflects **sampling uncertainty**, not measurement error

### **Visual Interpretation:**
```
    ┌─────────┐
    │   •     │  ← Point estimate
    │  ───    │  ← 95% confidence interval
    │         │
    └─────────┘
```

**Wider intervals** = More uncertainty  
**Narrower intervals** = Less uncertainty  

---

## Statistical Significance

### **How to Assess Significance:**

**1. Overlap Method:**
- **No overlap** between age groups = Likely statistically significant
- **Partial overlap** = May be significant, check p-values
- **Complete overlap** = Likely not statistically significant

**2. P-value Interpretation:**
- **p < 0.05** = Statistically significant difference
- **p ≥ 0.05** = No statistically significant difference
- **Effect size** should also be considered

### **Example Scenarios:**

**Significant Difference:**
```
Age 25-34: 7.2 ± 0.3  ← No overlap
Age 65-74: 6.8 ± 0.3  ← Statistically significant
```

**Non-significant Difference:**
```
Age 25-34: 7.2 ± 0.5  ← Overlap present
Age 65-74: 7.0 ± 0.5  ← May not be significant
```

---

## Why This Matters for Well-being Data

### **Survey Sampling:**
- **Sample size** affects confidence interval width
- **Response rates** influence representativeness
- **Demographic groups** may have different response patterns
- **Geographical variation** in well-being levels

### **Age Group Considerations:**
- **Younger adults** may have different response patterns
- **Older adults** may have health-related response bias
- **Life stage** effects on well-being expression
- **Cultural differences** across generations

---

## Survey Methodology Context

### **ONS Annual Population Survey:**
- **Sample size:** ~320,000 individuals annually
- **Response rate:** ~50-60%
- **Weighting:** Complex survey weights applied
- **Stratification:** By region and local authority

### **Well-being Questions:**
- **Self-reported** subjective measures
- **0-10 scale** for all four questions
- **No proxy responses** allowed
- **Consistent wording** across years

---

## Interpreting the Visualization

### **Key Questions to Ask:**

**1. Are the differences real?**
- Check for overlap in confidence intervals
- Consider sample sizes for each age group
- Look for consistent patterns across years

**2. Are the differences meaningful?**
- Consider effect sizes, not just significance
- Think about practical implications
- Compare to other well-being measures

**3. What explains the patterns?**
- Life stage effects (work, family, health)
- Cohort effects (generational differences)
- Response bias (age-related differences)
- Cultural factors (well-being expression)

---

## Best Practices for Uncertainty Communication

### **Visual Elements:**
- **Error bars** clearly visible
- **Consistent formatting** across chart
- **Clear labeling** of confidence level
- **Adequate spacing** for readability

### **Textual Elements:**
- **Confidence level** stated (95% CI)
- **Sample sizes** for each group
- **Statistical significance** noted
- **Limitations** acknowledged

### **Interpretation Guidance:**
- **How to read** confidence intervals
- **What significance** means
- **Limitations** of the data
- **Context** for the findings

---

## Limitations and Considerations

### **Statistical Limitations:**
- **Multiple comparisons** may inflate significance
- **Effect sizes** should be considered
- **Sample size** affects power to detect differences
- **Response bias** may affect representativeness

### **Interpretation Challenges:**
- **Causation vs. correlation** - age differences don't imply causation
- **Temporal changes** - patterns may change over time
- **Cultural factors** - well-being expression varies by culture
- **Life stage effects** - age groups represent different life stages

---

## Research Applications

### **Academic Research:**
- **Longitudinal analysis** of well-being trends
- **Cohort studies** of generational differences
- **Policy evaluation** of age-related interventions
- **Cross-cultural** well-being comparisons

### **Policy Applications:**
- **Age-specific** well-being strategies
- **Targeted interventions** for vulnerable groups
- **Monitoring** of well-being trends
- **Evaluation** of policy effectiveness

---

## Related Statistical Concepts

### **Standard Error:**
- **Standard deviation** of the sampling distribution
- **Smaller standard error** = narrower confidence intervals
- **Larger sample sizes** = smaller standard errors

### **P-values:**
- **Probability** of observing the data if null hypothesis is true
- **p < 0.05** = reject null hypothesis
- **Should be reported** alongside confidence intervals

### **Effect Size:**
- **Magnitude** of the difference, not just significance
- **Practical importance** of the finding
- **Cohen's d** or similar measures

---

## Educational Resources

### **Statistical Learning:**
- **Confidence intervals** tutorial materials
- **Survey methodology** guides
- **Statistical significance** explanations
- **Effect size** interpretation guides

### **Well-being Research:**
- **Subjective well-being** measurement
- **Age and well-being** literature
- **Survey methodology** best practices
- **Policy applications** of well-being data

---

## Related Resources

- **ONS Well-being:** [ons.gov.uk/peoplepopulationandcommunity/wellbeing](https://ons.gov.uk/peoplepopulationandcommunity/wellbeing)
- **Statistical Significance:** [statisticshowto.com/statistical-significance](https://statisticshowto.com/statistical-significance)
- **Confidence Intervals:** [statisticshowto.com/confidence-interval](https://statisticshowto.com/confidence-interval)
- **Survey Methodology:** [ons.gov.uk/methodology](https://ons.gov.uk/methodology) 