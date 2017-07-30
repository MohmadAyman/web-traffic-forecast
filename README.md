# web-traffic-forecast
This Repo holds the trends data as a csv file for each page,

## 0-27 pages done.

# The script used to fetch the trends is in dl_trends,

```git clone https://github.com/MohmadAyman/web-traffic-forecast```

``` cd dl_trends ```

```npm install```

```node index.js -page number-```

## Or run on a range in python

```python
import subprocess

start = 0
end = 27
ks = [i for i in range(start, end)]

for i in ks:
    bashCommand = "node index.js " + str(i)
    process = subprocess.Popen(bashCommand.split(), stdout=subprocess.PIPE)
```
