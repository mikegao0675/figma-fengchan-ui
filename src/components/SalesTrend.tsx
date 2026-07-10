import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

const hours = Array.from({ length: 24 }, (_, i) => i);

// Seed with deterministic-ish values
const todayVals = [0,3200,5100,6800,8200,9500,11200,14300,18900,27400,38200,47800,54600,60100,67300,72800,80100,88900,98400,106200,113800,119600,124800,128460];
const yestVals  = [0,2800,4600,6100,7800,9000,10500,13800,17400,24600,34700,43200,49800,55200,62400,68900,75600,83400,92100,99800,106300,112500,117900,121340];
const lastWkVals= [0,2500,4200,5600,7100,8400,9800,12700,16100,22900,32400,40800,47200,52600,58900,65100,72300,80100,88600,95900,102200,108100,113600,117200];

const data = hours.map((h) => ({
  hour: `${h}:00`,
  今日: todayVals[h],
  昨日: yestVals[h],
  上周同天: lastWkVals[h],
}));

const fmt = (v: number) => v >= 10000 ? `${(v / 10000).toFixed(1)}万` : `${v}`;

export default function SalesTrend() {
  return (
    <div style={{ background: "#141414", border: "1px solid #1e1e1e", borderRadius: 8, padding: "16px 8px 8px 0" }}>
      <ResponsiveContainer width="100%" height={220}>
        <LineChart data={data} margin={{ top: 4, right: 16, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#1e1e1e" vertical={false} />
          <XAxis
            dataKey="hour"
            tick={{ fill: "#444", fontSize: 10 }}
            tickLine={false}
            axisLine={false}
            interval={3}
          />
          <YAxis
            tick={{ fill: "#444", fontSize: 10 }}
            tickLine={false}
            axisLine={false}
            tickFormatter={fmt}
            width={44}
          />
          <Tooltip
            contentStyle={{ background: "#1a1a1a", border: "1px solid #2a2a2a", borderRadius: 6, fontSize: 12 }}
            labelStyle={{ color: "#888", fontSize: 11 }}
            formatter={(v: unknown) => `¥${Number(v).toLocaleString()}`}
          />
          <Legend
            iconType="plainline"
            iconSize={16}
            wrapperStyle={{ fontSize: 11, paddingTop: 8, paddingLeft: 16 }}
          />
          <Line type="monotone" dataKey="今日" stroke="#f0f0f0" strokeWidth={2} dot={false} />
          <Line type="monotone" dataKey="昨日" stroke="#444" strokeWidth={1.5} dot={false} strokeDasharray="4 2" />
          <Line type="monotone" dataKey="上周同天" stroke="#2a2a2a" strokeWidth={1.5} dot={false} strokeDasharray="2 3" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
