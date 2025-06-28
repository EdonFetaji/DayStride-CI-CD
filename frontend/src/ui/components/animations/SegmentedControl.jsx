import { SegmentedControl } from "@mantine/core";

function GradientSegmentedControl({ value, onChange }) {
    return (
        <SegmentedControl
            radius="xl"
            size="md"
            data={['Past', 'Upcoming']}
            value={value}
            onChange={onChange}
            styles={{
                root: {
                    background: "#ffffff",
                    boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
                    border: "1px solid #e0e0e0",
                    padding: "4px",
                    transition: "all 0.4s ease", // smoother transitions
                },
                control: {
                    fontWeight: 600,
                    fontSize: "14px",
                    color: "#374151",
                    padding: "8px 16px",
                    transition: "color 0.4s ease, background 0.4s ease",
                },
                indicator: {
                    background: "linear-gradient(90deg, #f59e0b, #f97316)",
                    color: "white",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.15)", // added shadow for depth
                    borderRadius: "9999px",
                    transition: "transform 0.4s ease, background 0.4s ease",
                },
                label: {
                    color: "#374151",
                },
            }}
        />
    );
}

export default GradientSegmentedControl;
